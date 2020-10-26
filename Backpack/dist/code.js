"use strict";
let itemsText = document.querySelector(".items");
let table = document.querySelector(".table");
let tableBag = document.querySelector('.tableBag');
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
        this.amount = [];
        this.totalWeight = [];
        this.totalVolume = [];
        this.allWeight = 0;
        this.allVolume = 0;
        for (let i = 0; i < items.length; i++) {
            this.amount.push(0);
            this.totalWeight.push(0);
            this.totalVolume.push(0);
        }
    }
    AddItem(articleID) {
        if (this.allWeight < this.maxWeight
            && this.allVolume < this.maxVolume
            && this.itemArray[articleID].weight + this.allWeight < this.maxWeight
            && this.itemArray[articleID].weight + this.allVolume < this.maxVolume) {
            if (this.amount[articleID] < 1) {
                this.insideBag.push(this.itemArray[articleID]);
            }
            this.amount[articleID]++;
            this.totalWeight[articleID] = this.itemArray[articleID].weight * this.amount[articleID];
            this.totalVolume[articleID] = this.itemArray[articleID].volume * this.amount[articleID];
            this.CurrentWeight();
            this.CurrentVolume();
            this.ShowItems();
        }
    }
    RemoveItem(articleID, number) {
        if (this.amount[articleID] > 0) {
            this.amount[articleID]--;
            this.totalWeight[articleID] = this.itemArray[articleID].weight * this.amount[articleID];
            this.totalVolume[articleID] = this.itemArray[articleID].volume * this.amount[articleID];
            if (this.amount[articleID] < 1) {
                this.insideBag = this.insideBag.filter(item => item.id != articleID);
            }
            this.CurrentWeight();
            this.CurrentVolume();
            this.ShowItems();
        }
    }
    ShowItems() {
        tableBag.innerHTML =
            `
        <tr>
        <th>Artikel</th>
        <th>Antal</th>
        <th>Vikt/st (Kg)</th>
        <th>Volym/st (liter)</th>
        <th>Total Vikt (Kg)</th>
        <th>Total Volym (liter)</th>
        </tr>
        `;
        table.innerHTML =
            `
        <tr>
        <th>Artikel</th>
        <th>Antal</th>
        <th>Vikt/st (Kg)</th>
        <th>Volym/st (liter)</th>
        <th>Total Vikt (Kg)</th>
        <th>Total Volym (liter)</th>
        </tr>
        `;
        for (let item of this.itemArray) {
            table.innerHTML +=
                `
            <tr>
            <td>${item.description}</td>
            <td><button id="${item.description}Min">-</button> ${this.amount[item.id]} <button id="${item.description}Plus">+</button></td>
            <td>${item.weight}</td>
            <td>${item.volume}</td>
            <td>${this.totalWeight[item.id].toFixed(2)}</td>
            <td>${this.totalVolume[item.id].toFixed(2)}</td>
            </tr>
            `;
        }
        for (let item of this.itemArray) {
            let btnMinus = document.querySelector(`#${item.description}Min`);
            btnMinus.addEventListener('click', () => this.RemoveItem(item.id, 1));
            let btnPlus = document.querySelector(`#${item.description}Plus`);
            btnPlus.addEventListener('click', () => this.AddItem(item.id));
        }
        if (this.insideBag.length > 0) {
            for (let item of this.insideBag) {
                tableBag.innerHTML +=
                    `
                <tr>
                <td>${item.description}</td>
                <td><button id="${item.description}MinBag">-</button> ${this.amount[item.id]} <button id="${item.description}PlusBag">+</button></td>
                <td>${item.weight}</td>
                <td>${item.volume}</td>
                <td>${this.totalWeight[item.id].toFixed(2)}</td>
                <td>${this.totalVolume[item.id].toFixed(2)}</td>
                </tr>
                `;
            }
            for (let item of this.insideBag) {
                let btnMinusBag = document.querySelector(`#${item.description}MinBag`);
                btnMinusBag.addEventListener('click', () => this.RemoveItem(item.id, 1));
                let btnPlusBag = document.querySelector(`#${item.description}PlusBag`);
                btnPlusBag.addEventListener('click', () => this.AddItem(item.id));
            }
        }
    }
    CurrentWeight() {
        this.allWeight = 0;
        for (let i = 0; i < this.itemArray.length; i++) {
            this.allWeight += this.totalWeight[i];
        }
        console.log("Weight: " + this.allWeight);
    }
    CurrentVolume() {
        this.allVolume = 0;
        for (let i = 0; i < this.itemArray.length; i++) {
            this.allVolume += this.totalVolume[i];
        }
        console.log("Volume: " + this.allVolume);
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
