 function renameProperty(obj, oldName, newName) {
     if (obj.hasOwnProperty(oldName)) {
         obj[newName] = obj[oldName];
         delete obj[oldName];
     }
     return obj;
 };


 module.exports = renameProperty