

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

var titleYarg = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
};

var bodyYarg = {
  describe: 'Body of the note',
  demand: true,
  alias: 'b'
};

const argv = yargs
  .command('add', 'Add a new note', {
    title: titleYarg,
    body: bodyYarg
  })
  .command('remove', 'Remove a note', {
    title: titleYarg
  })
  .command('read', 'Read a note', {
    title: titleYarg
  })
  .command('list', 'List all notes')
  .help()
  .argv;
var command = argv._[0];


if (command === 'add'){
  var add = notes.addNote(argv.title, argv.body);
  if (add){
    console.log('Note created');
    console.log('---');
    notes.logNote(add);
  }else{
    console.log('A note with that title already exists');
  }
}else if(command === 'list'){
  var list = notes.getAll();
  try {
    if (list.length !== 0){
      console.log(`Printing ${list.length} note(s)`);
      console.log('---');
      list.forEach((note) => {
        notes.logNote(note);
      });
    }else{
      console.log('There are currently no notes');
    }
  }catch (err) {
      console.log('No notes exist. Please add a note.');
  }
}else if(command === 'read'){
  var read = notes.getNote(argv.title);
  try {
    if(read.length !== 0){
      console.log('Note read');
      console.log('---');
      notes.logNote(read);
    }else{
      console.log('A note with that title does not exist');
    }
  }catch (err){
    console.log('No notes exist. Please add a note.');
  }
}else if(command === 'remove'){
  var remove = notes.removeNote(argv.title);
  if (remove){
    console.log('Note removed');
    console.log('---');
    console.log(`Note removed with title ${argv.title}`);
  }else{
    console.log('No note found with that title');
  }
}else{
  console.log('Command not recognized');
}
