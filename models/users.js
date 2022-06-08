const { row, rows } = require('../utils/database');

module.exports = class User {
  constructor(id, username, password, full_name) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.full_name = full_name;
  }

  save() {
    const insertUser = `INSERT INTO USERS(username, password, full_name) VALUES ($1, $2, $3) RETURNS user_id, username, fullname, role`;
    return row(insertUser, this.username, this.password, this.full_name);
  }
};
