/**
 * MedScan AI - User Authentication & Session Manager
 * Allows registration with: Name, Mobile Number, Password, Age, Gender, Health Conditions, Allergies
 * Allows Sign In with: Name, Mobile Number & Password
 * Manages Logout and user sessions
 */

class AuthManager {
  constructor() {
    this.usersKey = 'medscan_registered_users';
    this.sessionKey = 'medscan_current_session';
    this.init();
  }

  init() {
    let users = this.getUsers();
    if (!users || users.length === 0) {
      users = [
        {
          id: 'usr-demo-1',
          name: 'Alex Sharma',
          phone: '9876543210',
          password: 'password123',
          age: 34,
          gender: 'Male',
          conditions: ['Hypertension', 'Type 2 Diabetes'],
          allergies: ['Penicillin', 'Sulfa Drugs'],
          bloodGroup: 'B+',
          avatar: '👨‍💼',
          registeredAt: new Date().toISOString()
        },
        {
          id: 'usr-demo-2',
          name: 'Dr. Priya Patel',
          phone: '9123456789',
          password: 'doctor2026',
          age: 41,
          gender: 'Female',
          conditions: ['Mild Asthma'],
          allergies: ['NSAIDs / Aspirin'],
          bloodGroup: 'O+',
          avatar: '👩‍⚕️',
          registeredAt: new Date().toISOString()
        }
      ];
      this.saveUsers(users);
    } else {
      // Ensure existing users have phone populated if previously missing
      let changed = false;
      users.forEach(u => {
        if (!u.phone) {
          u.phone = u.name.includes('Priya') ? '9123456789' : '9876543210';
          changed = true;
        }
      });
      if (changed) this.saveUsers(users);
    }
  }

  getUsers() {
    try {
      const data = localStorage.getItem(this.usersKey);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  saveUsers(users) {
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  getCurrentUser() {
    try {
      const session = localStorage.getItem(this.sessionKey);
      return session ? JSON.parse(session) : null;
    } catch {
      return null;
    }
  }

  setCurrentUser(user) {
    if (user) {
      localStorage.setItem(this.sessionKey, JSON.stringify(user));
    } else {
      localStorage.removeItem(this.sessionKey);
    }
    window.dispatchEvent(new CustomEvent('auth_state_changed', { detail: { user } }));
  }

  register({ name, phone, password, age, gender, conditions, allergies }) {
    if (!name || name.trim().length === 0) {
      throw new Error('Please enter your full name.');
    }
    if (!password || password.length < 3) {
      throw new Error('Password must be at least 3 characters.');
    }

    const cleanName = name.trim();
    const cleanPhone = phone ? phone.trim().replace(/[\s-]/g, '') : '';
    const users = this.getUsers();

    // Check if name or phone already exists
    const exists = users.find(u => 
      u.name.toLowerCase() === cleanName.toLowerCase() ||
      (cleanPhone && u.phone && u.phone.replace(/[\s-]/g, '') === cleanPhone)
    );

    if (exists) {
      throw new Error(`An account with this Name or Phone Number is already registered. Please sign in instead.`);
    }

    const conditionsArray = Array.isArray(conditions)
      ? conditions
      : (conditions ? conditions.split(',').map(s => s.trim()).filter(Boolean) : []);

    const allergiesArray = Array.isArray(allergies)
      ? allergies
      : (allergies ? allergies.split(',').map(s => s.trim()).filter(Boolean) : []);

    const newUser = {
      id: 'usr-' + Date.now(),
      name: cleanName,
      phone: cleanPhone || '9876543210',
      password: password,
      age: parseInt(age) || 30,
      gender: gender || 'Male',
      conditions: conditionsArray,
      allergies: allergiesArray,
      bloodGroup: 'O+',
      avatar: gender === 'Female' ? '👩' : (gender === 'Other' ? '🧑' : '👨'),
      registeredAt: new Date().toISOString()
    };

    users.push(newUser);
    this.saveUsers(users);

    // Auto log in after registration
    this.setCurrentUser(newUser);

    // Synchronize active patient profile
    if (window.patientManager) {
      window.patientManager.addPatient({
        id: newUser.id,
        name: newUser.name,
        age: newUser.age,
        gender: newUser.gender,
        conditions: newUser.conditions,
        allergies: newUser.allergies,
        bloodGroup: newUser.bloodGroup
      });
    }

    return newUser;
  }

  /**
   * Supports:
   * login(name, number, password)
   * OR login({ name, number, password })
   */
  login(nameOrObj, phoneOrPassword, maybePassword) {
    let name = '';
    let phone = '';
    let password = '';

    if (typeof nameOrObj === 'object') {
      name = nameOrObj.name || '';
      phone = nameOrObj.phone || nameOrObj.number || '';
      password = nameOrObj.password || '';
    } else if (maybePassword !== undefined) {
      name = nameOrObj;
      phone = phoneOrPassword;
      password = maybePassword;
    } else {
      name = nameOrObj;
      password = phoneOrPassword;
    }

    if (!name || name.trim().length === 0) {
      throw new Error('Please enter your Name.');
    }
    if (!password) {
      throw new Error('Please enter your Password.');
    }

    const cleanName = name.trim().toLowerCase();
    const cleanPhone = phone ? phone.trim().replace(/[\s-]/g, '') : '';
    const users = this.getUsers();

    // Find matching user by Name and/or Phone
    const user = users.find(u => {
      const matchName = u.name.toLowerCase() === cleanName;
      const matchPhone = cleanPhone && u.phone && u.phone.replace(/[\s-]/g, '') === cleanPhone;
      // If both name and phone provided, either matches or both match
      if (cleanPhone) {
        return matchName || matchPhone;
      }
      return matchName;
    });

    if (!user) {
      throw new Error(`No registered account found matching "${name.trim()}". Please verify your credentials or register an account!`);
    }

    if (user.password !== password) {
      throw new Error('Incorrect password. Please verify and try again.');
    }

    this.setCurrentUser(user);

    // Sync active patient profile
    if (window.patientManager) {
      window.patientManager.setActivePatientId(user.id);
    }

    return user;
  }

  logout() {
    this.setCurrentUser(null);
  }

  loginAsDemo(index = 0) {
    const users = this.getUsers();
    const demo = users[index] || users[0];
    if (demo) {
      this.setCurrentUser(demo);
      if (window.patientManager) {
        window.patientManager.setActivePatientId(demo.id);
      }
      return demo;
    }
    return null;
  }
}

window.authManager = new AuthManager();
