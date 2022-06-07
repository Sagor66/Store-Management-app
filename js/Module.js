const productDB = (dbname, table) => {
  // create database
  const db = new Dexie(dbname);
  db.version(1).stores(table);
  db.open();

  return db;
};

// Insertion
const bulkCreate = (dbtable, data) => {
  let flag = empty(data);
  if (flag) {
    dbtable.bulkAdd([data]);
    console.log("Data inserted successfully");
  } else {
    console.log("Please provide data.");
  }
  return flag;
};

// textbox validation
const empty = (object) => {
  let flag = false;
  for (const value in object) {
    if (object[value] != "" && object.hasOwnProperty(value)) {
      flag = true;
    } else {
      flag = false;
    }
  }
  return flag;
};

// Get data from database
const getData = (dbtable, fn) => {
  let index = 0;
  let obj = {};

  dbtable.count((count) => {
    if (count) {
      dbtable.each((table) => {
        obj = sortObj(table);
        fn(obj, index++);
      });
    } else {
      fn(0);
    }
  });
};

// Sort obj
const sortObj = (sortobj) => {
  let obj = {};
  obj = {
    id: sortobj.id,
    name: sortobj.name,
    seller: sortobj.seller,
    price: sortobj.price,
  };
  return obj;
};

// Create dynamic elements
const createEle = (tagname, appendTo, fn) => {
  const element = document.createElement(tagname);
  if (appendTo) appendTo.appendChild(element);
  if (fn) fn(element);
};

export default productDB;
export { bulkCreate, getData, createEle };
