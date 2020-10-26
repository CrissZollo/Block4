var itemsText = document.querySelector(".items");
var items = [];
// Reads from the items.txt file and give every item specific properties
fetch('items.txt')
    .then(function (response) { return response.text(); })
    .then(function (textString) {
    var rows = textString.split('\n');
    var tempArray1 = [];
    var tempArray2 = [];
    rows.forEach(function (row) {
        tempArray1.push(row);
    });
    for (var i = 0; i < tempArray1.length; i++) {
        var words = tempArray1[i].split(" ");
        words.forEach(function (word) {
            tempArray2.push(word);
        });
    }
    console.log(tempArray2);
    console.log(tempArray1);
    for (var i = 0; i < tempArray1.length; i++) {
        itemsText.innerHTML = itemsText.innerHTML + tempArray1[i];
        var item = {
            itemID: i,
            description: tempArray2[(i * 3)],
            weight: tempArray2[(i * 3) + 1],
            volume: tempArray2[(i * 3) + 2]
        };
        items.push(item);
    }
});
var Backpack = /** @class */ (function () {
    function Backpack(items) {
        this.maxWeight = 60;
        this.maxVolume = 50;
        this.itemArray = items;
        this.insideBag = [];
    }
    Backpack.prototype.AddItem = function (articleID) {
        console.log(this.itemArray);
        this.insideBag.push(this.itemArray[articleID]);
        console.log(this.itemArray[articleID]);
    };
    Backpack.prototype.RemoveItem = function (articleID, number) { };
    Backpack.prototype.ShowItems = function () { };
    Backpack.prototype.CurrentWeight = function () { };
    Backpack.prototype.CurrentVolume = function () { };
    return Backpack;
}());
var data = new Backpack(items);
data.AddItem(5);
