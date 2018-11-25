"use strict";

//lesson 2
window.renderStatistics = function (ctx, names, times) {
    const cloudWidth = 420,
        cloudHeight = 270,
        cloudX = 100,
        cloudY = 0,
        cloudShadowX = cloudX + 10,
        cloudShadowY = cloudY + 10,
        fontSize = 16,
        gutter = 8,
        contentX = 135,
        shadowMainTextY = 40,
        columnWidth = 40,
        gutterWidth = 50,
        gistogramRectHeight = 150,
        gistgramTextBottom = 250,
        gistgramColumnBottom = gistgramTextBottom - fontSize,
        maxTime = Math.max(...times);
    let distance = contentX;
    //
    ctx.strokeStyle = '#000000';
    ctx.strokeRect(cloudX, cloudY, cloudWidth, cloudHeight);
    //
    renderRect(ctx, cloudShadowX, cloudShadowY, cloudWidth, cloudHeight, 'rgba(0,0,0, 0.7)');
    renderRect(ctx, cloudX, cloudY, cloudWidth, cloudHeight, '#ffffff');
    //
    renderText('You Win !!!', ctx, contentX, shadowMainTextY, `${fontSize}px PT Mono`, '#000000');
    renderText('List of results: ', ctx, contentX, shadowMainTextY + gutter + fontSize, `${fontSize}px PT Mono`, '#000000');
    //

    for (let i = 0; i < names.length; i++) {
        let rectHeight = Math.round((times[i] / maxTime) * gistogramRectHeight - (fontSize * 2));
        //
        renderText(names[i], ctx, distance, gistgramTextBottom, `${fontSize} PT Mono`, '#000000');
        renderText(Math.round(times[i]), ctx, distance, gistgramColumnBottom  - rectHeight - gutter, `${fontSize} PT Mono`, '#000000');
        //
        renderRect(ctx, distance, gistgramColumnBottom - rectHeight, columnWidth, rectHeight, (names[i] === 'You') ? '#ff0000' : `hsl(255, ${Number(Math.random().toFixed(2)) * 100}%, 50%)`);
        //
        distance += columnWidth + gutterWidth;
    }
};

function renderRect (ctx, coordinateX, coordinateY,rectW, rectH, color) {
    ctx.fillStyle = color;
    ctx.fillRect(coordinateX, coordinateY, rectW, rectH);
}

function renderText (text, ctx, coordinatesX, coordinatesY, font, color) {
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.fillText(text, coordinatesX, coordinatesY);
}
