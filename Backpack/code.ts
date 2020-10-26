let itemsText = document.querySelector(".items");
let items = [];

// Reads from the items.txt file and give every item specific properties
fetch('items.txt')
    .then(response => response.text())
    .then(textString => {


        const rows = textString.split('\n');

        let tempArray1 = [];
        let tempArray2 = [];

        rows.forEach(row => {
            tempArray1.push(row);
        });

        for (let i = 0; i < tempArray1.length; i++) {
            const words = tempArray1[i].split(" ");
            words.forEach(word => {
                tempArray2.push(word);
            });
        }

        console.log(tempArray2);


        console.log(tempArray1);
        for (let i = 0; i < tempArray1.length; i++) {
            itemsText.innerHTML = itemsText.innerHTML + tempArray1[i];


            let item = {
                itemID: i,
                description: tempArray2[(i * 3)],
                weight: tempArray2[(i * 3) + 1],
                volume: tempArray2[(i * 3) + 2]
            };

            items.push(item);

        }
    });


class Backpack {
    maxWeight: Number;
    maxVolume: Number;
    itemArray: Object[];
    insideBag: Object[];


    constructor(items: Object[]) {
        this.maxWeight = 60;
        this.maxVolume = 50;
        this.itemArray = items;
        this.insideBag = [];
    }


    AddItem(articleID) {

        console.log(this.itemArray);
        this.insideBag.push(this.itemArray[articleID]);
        console.log(this.itemArray[articleID])
    }

    RemoveItem(articleID, number) { }

    ShowItems() { }

    CurrentWeight() { }

    CurrentVolume() { }

}



let data = new Backpack(items);
data.AddItem(5);