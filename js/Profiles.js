const Profile = {
  currentProfile: null,
  getProfile() {
    const storedProfile = localStorage.getItem('profile1');
    if (storedProfile) {
      this.currentProfile = JSON.parse(storedProfile);
    } else {
      this.currentProfile = {
        name: 'Player',
        credits: 1000
      };
    }
  },
  saveProfile() {
    localStorage.setItem('profile1', JSON.stringify(this.currentProfile));
  },

  setCredits(amount) {
    this.currentProfile.credits = amount;
    this.saveProfile();
  },

  setName(name) {
    this.currentProfile.name = name;
    this.saveProfile();
  }
};
export { Profile };
