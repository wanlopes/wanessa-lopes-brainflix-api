const express = require('express');
const fs = require('fs');

const dataVideos = videos.json;

function readData() {
    try {
        const data =  fs.readFileSync(dataVideos);
        return JSON.parse(data);
    }
    catch (error) {
        return [];
    }
}

function writeData() {
    fs.writeFileSync(dataVideos, JSON.stringify);
}