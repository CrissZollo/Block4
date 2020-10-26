"use strict";
let itemsText = document.querySelector(".items");
let table = document.querySelector(".table");
let items = [];
class Item {
    constructor(id, description, weight, volume) {
        this.id = id;
        this.description = description;
        this.weight = weight;
        this.volume = volume;
    }
}
class Backpack {
    constructor(items) {
        this.maxWeight = 60;
        this.maxVolume = 50;
        this.itemArray = items;
        this.insideBag = [];
    }
    AddItem(articleID) {
        this.insideBag.push(this.itemArray[articleID]);
        console.log(this.insideBag);
    }
    RemoveItem(articleID, number) { }
    ShowItems() {
        for (let item of this.itemArray) {
            table.innerHTML +=
                `
            <tr>
            <td>${item.description}</td>
            <td><button id="${item.description}Min">-</button> 0 <button id="${item.description}Plus">+</button></td>
            <td>${item.weight}</td>
            <td>${item.volume}</td>
            <td>max vikt</td>
            <td>max volym</td>
            </tr>
            `;
            let btnMinus = document.querySelector(`#${item.description}Min`);
            // console.log(btnMinus);
            btnMinus.addEventListener('click', () => this.RemoveItem(item.id, 1));
            let btnPlus = document.querySelector(`#${item.description}Plus`);
            btnPlus.addEventListener('click', () => this.AddItem(item.id));
            console.log(btnPlus);
        }
    }
    CurrentWeight() {
    }
    CurrentVolume() {
    }
    async fetchItems() {
    }
}
async function fetchItems() {
    // Reads from the items.txt file and give every item specific properties
    let respons = await fetch('items.txt');
    let textString = await respons.text();
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
    for (let i = 0; i < tempArray1.length; i++) {
        let item = new Item(i, tempArray2[(i * 3)], +tempArray2[(i * 3) + 1], +tempArray2[(i * 3) + 2]);
        items.push(item);
    }
}
(async function () {
    await fetchItems();
    let data = new Backpack(items);
    data.ShowItems();
})();
