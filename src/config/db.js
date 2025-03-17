import * as SQLite from "expo-sqlite/legacy";

const db = SQLite.openDatabase("app.db");

export const init = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS user (
          id INTEGER PRIMARY KEY NOT NULL,
          data TEXT,
          token TEXT,
          dbc TEXT
      );`,
        [],
        () => resolve(),
        (_, err) => {
          console.log("Error creating users table:", err);
          reject(err);
        }
      );
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS agreement (
          id INTEGER PRIMARY KEY NOT NULL,
          eula TEXT
      );`,
        [],
        () => resolve(),
        (_, err) => {
          console.log("Error creating agreements table:", err);
          reject(err);
        }
      );
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS company (
          id INTEGER PRIMARY KEY NOT NULL,
          code TEXT
      );`,
        [],
        () => resolve(),
        (_, err) => {
          console.log("Error creating company code table:", err);
          reject(err);
        }
      );
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS firebase (
          id INTEGER PRIMARY KEY NOT NULL,
          token TEXT,
          expired DATE
      );`,
        [],
        () => resolve(),
        (_, err) => {
          console.log("Error creating firebase table:", err);
          reject(err);
        }
      );
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS attend (
          id INTEGER PRIMARY KEY NOT NULL,
          time TEXT
      );`,
        [],
        () => resolve(),
        (_, err) => {
          console.log("Error creating attend table:", err);
          reject(err);
        }
      );
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS gohome (
          id INTEGER PRIMARY KEY NOT NULL,
          time TEXT
      );`,
        [],
        () => resolve(),
        (_, err) => {
          console.log("Error creating go home table:", err);
          reject(err);
        }
      );
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS clockin (
          id INTEGER PRIMARY KEY NOT NULL,
          time TEXT
      );`,
        [],
        () => resolve(),
        (_, err) => {
          console.log("Error creating clock in table:", err);
          reject(err);
        }
      );
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS clockout (
          id INTEGER PRIMARY KEY NOT NULL,
          time TEXT
      );`,
        [],
        () => resolve(),
        (_, err) => {
          console.log("Error creating clock out table:", err);
          reject(err);
        }
      );
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS timegroup (
          id INTEGER PRIMARY KEY NOT NULL,
          time_group_id INTEGER,
          name TEXT,
          start_date DATE,
          detail TEXT
      );`,
        [],
        () => resolve(),
        (_, err) => {
          console.log("Error creating time group table:", err);
          reject(err);
        }
      );
    });
  });
};

export const insertUser = (data, token, dbc) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO user (data, token, dbc) VALUES (?, ?, ?);",
        [data, token, dbc],
        () => resolve(),
        (_, err) => reject(err)
      );
    });
  });
};

export const insertFirebase = (firebaseToken, date) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO firebase (token, expired) VALUES (?, ?);",
        [firebaseToken, date],
        () => resolve(),
        (_, err) => reject(err)
      );
    });
  });
};

export const insertAgreement = (agree) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO agreement (eula) VALUES (?);",
        [agree],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });
};

export const insertCompanyCode = (code) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO company (code) VALUES (?);",
        [code],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });
};

export const insertAttend = (code) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO attend (time) VALUES (?);",
        [code],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });
};

export const insertGoHome = (code) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO gohome (time) VALUES (?);",
        [code],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });
};

export const insertTimeGroup = (time_group_id, name, start_date, detail) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO timegroup (time_group_id, name, start_date, detail) VALUES (?, ?, ?, ?);",
        [time_group_id, name, start_date, JSON.stringify(detail)],
        () => resolve(),
        (_, err) => reject(err)
      );
    });
  });
};

export const fetchUser = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM user;",
        [],
        (_, result) => resolve(result.rows._array),
        (_, err) => reject(err)
      );
    });
  });
};

export const fetchAgreement = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM agreement;",
        [],
        (_, result) => resolve(result.rows._array),
        (_, err) => reject(err)
      );
    });
  });
};

export const fetchFirebase = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM firebase;",
        [],
        (_, result) => resolve(result.rows._array),
        (_, err) => reject(err)
      );
    });
  });
};

export const fetchAttend = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM attend;",
        [],
        (_, result) => resolve(result.rows._array),
        (_, err) => reject(err)
      );
    });
  });
};

export const fetchGoHome = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM gohome;",
        [],
        (_, result) => resolve(result.rows._array),
        (_, err) => reject(err)
      );
    });
  });
};

export const fetchTimeGroup = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM timegroup;",
        [],
        (_, result) => resolve(result.rows._array),
        (_, err) => reject(err)
      );
    });
  });
};

export const deleteUser = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM user;",
        [],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });
};

export const deleteFirebase = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM firebase;",
        [],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });
};

export const deleteAttend = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM attend;",
        [],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });
};

export const deleteGoHome = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM gohome;",
        [],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });
};

export const deleteTimeGroup = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM timegroup;",
        [],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });
};
