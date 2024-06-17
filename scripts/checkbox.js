function checkOnlyOne(b,classname){

    var x = document.getElementsByClassName(classname);
    console.log(classname)
    var i;
    
    for (i = 0; i < x.length; i++) {
      if(x[i].value != b) x[i].checked = false;
    }
    }
    