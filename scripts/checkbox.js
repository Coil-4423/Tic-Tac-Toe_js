function checkOnlyOne(b,classname){
    const x = document.getElementsByClassName(classname);
    for (let i = 0; i < x.length; i++) {
      if(x[i].value != b) x[i].checked = false;
    }
}
    