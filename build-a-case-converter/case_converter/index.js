function getLowerCase(str){
    return str.toLowerCase();
}
function getSentenceCase(str) {
   const first = str[0].toUpperCase();
    const sliced = str.slice(1).toLowerCase();

return `${first}${sliced}`

}

function getProperCase(str) {
  
  let first = str.split(" ").slice(0, 1).join();
  let second = str.split(" ").slice(1).join();

  let one = first[0].toUpperCase();
  let one1 = first.slice(1).toLowerCase();
  let two = second[0].toUpperCase();
  let two2= second.slice(1).toLowerCase();

  return `${one}${one1} ${two}${two2}`;
}

module.exports = {
    getUpperCase,
    getLowerCase,
    getSentenceCase,
    getProperCase,

}