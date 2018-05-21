

const fs = require('fs');

var fetchNotes = () => {
  try {
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  }catch(err){
    return [];
  };
};

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
    // var prevNotes = fs.readFileSync('./journal.json');
    // notesObj = JSON.parse(prevNotes);
    // notesObj[title] = body;
    // notesString = JSON.stringify(notesObj);
    // fs.writeFileSync('./journal.json', notesString);
    var notes = fetchNotes();
    var note = {
      title,
      body
    };
    var dupliNotes = notes.filter( (note) => note.title === title);

    if (dupliNotes.length === 0){
      notes.push(note);
      saveNotes(notes);
      return note;
    }
};

var getAll = () => {
  // var prevNotes = JSON.parse(fs.readFileSync('./journal.json'));
  // Object.keys(prevNotes).forEach(function(key,index){
  //   console.log(key, ': ', prevNotes[key]);
  // });
  return fetchNotes();
};

var getNote = (title) => {
  // var prevNotes = JSON.parse(fs.readFileSync('./journal.json'));
  // console.log(prevNotes.title);
  var notes = fetchNotes();
  var specifiedNote = notes.filter((note) => note.title === title);
  return specifiedNote[0];
};

var removeNote = (title) => {
  // var prevNotes = JSON.parse(fs.readFileSync('./journal.json'));
  // delete prevNotes[title];
  // fs.writeFileSync('./journal.json', JSON.stringify(prevNotes));
  var notes = fetchNotes();
  var postRemoved = notes.filter((note) => note.title !== title);
  saveNotes(postRemoved);
  if (notes.length != postRemoved.length){
    return true;
  }else{
    return false;
  }
};

var logNote = (note) => {
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
}
module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
};
