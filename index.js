const request = require('request');
const resell = require('./resell.json');
function clearConsoleAndScrollbackBuffer() {
  process.stdout.write("\u001b[3J\u001b[2J\u001b[1J");console.clear();
  }
  function profit(){
    var array = '';
    clearConsoleAndScrollbackBuffer();
request(`https://api.hypixel.net/skyblock/bazaar`, {
  json: true
}, (err, res, test) => {
  if (err) {
    return console.log(err);
  }
  var i = 0;
  while (i < resell.length) {
    var id, demand, pppu, cost1024, profit1024;
    try {
      if (test.products[resell[i][0]].buy_summary[0].pricePerUnit < resell[i][1]) {
        id = resell[i][0];
        demand = test.products[resell[i][0]].quick_status.buyVolume;
        pppu = resell[i][1] - test.products[resell[i][0]].buy_summary[0].pricePerUnit;
        cost1024 = test.products[resell[i][0]].buy_summary[0].pricePerUnit * 1024;
        profit1024 = pppu * 1024;
        array += `
        ID: ${id}
        COST1024: ${cost1024}
        PROFIT1024: ${profit1024}
        PERCENT MADE BACK: ${(profit1024 / cost1024) * 100}%
        `;
      }
    } catch (err) {

    }
    i++;
  }
  console.log(array);
});
  }

  setInterval(()=>{
    profit();
  },20000);


