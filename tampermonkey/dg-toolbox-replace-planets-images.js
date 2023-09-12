// -- replace classic planet images with new ones
// -- this is a Vector Art theme and all images are generated by AI
(function replacePlanetsImages() {
    const images = [
        'https://i.imgur.com/7emDo7u.png', 'https://i.imgur.com/h645Sbz.png', 'https://i.imgur.com/jhDgAcf.png', 'https://i.imgur.com/hPmLTR0.png', 'https://i.imgur.com/sxNM2IU.png',
        'https://i.imgur.com/bBaVWvQ.png', 'https://i.imgur.com/X3AAaY8.png', 'https://i.imgur.com/4pf1Tju.png', 'https://i.imgur.com/IGzscND.png', 'https://i.imgur.com/xMtcWah.png',
        'https://i.imgur.com/DFtD4vX.png', 'https://i.imgur.com/brVnILl.png', 'https://i.imgur.com/TzTNSTy.png', 'https://i.imgur.com/QxAY3M7.png', 'https://i.imgur.com/HOkGrou.png',
        'https://i.imgur.com/ohkn0L3.png', 'https://i.imgur.com/cToV8VJ.png', 'https://i.imgur.com/6t8hPGr.png', 'https://i.imgur.com/7h7NOT4.png', 'https://i.imgur.com/vb0X7Ps.png',
        'https://i.imgur.com/a6X4pJs.png', 'https://i.imgur.com/HnEtjvk.png', 'https://i.imgur.com/SVJscff.png', 'https://i.imgur.com/BWRsjql.png', 'https://i.imgur.com/st8RPjI.png',
        'https://i.imgur.com/z0jUerc.png', 'https://i.imgur.com/x9hcGDC.png', 'https://i.imgur.com/XrQ9CUA.png', 'https://i.imgur.com/QqOjXY9.png', 'https://i.imgur.com/y0X6gqm.png',
        'https://i.imgur.com/AXYzFQH.png', 'https://i.imgur.com/3lA6hpV.png', 'https://i.imgur.com/dnyDoql.png', 'https://i.imgur.com/2tGXfQS.png', 'https://i.imgur.com/3cEusRW.png',
        'https://i.imgur.com/DObtztm.png', 'https://i.imgur.com/XDePZDB.png', 'https://i.imgur.com/ISLm7xG.png', 'https://i.imgur.com/adl759C.png', 'https://i.imgur.com/1BDs4cu.png',
        'https://i.imgur.com/NDpaU0U.png', 'https://i.imgur.com/nOwnoFN.png', 'https://i.imgur.com/lwHfvbV.png', 'https://i.imgur.com/c0N2U9t.png', 'https://i.imgur.com/a5V22XU.png',
        'https://i.imgur.com/HdJHwHM.png', 'https://i.imgur.com/5mqo2Gj.png', 'https://i.imgur.com/t1KAgBM.png', 'https://i.imgur.com/VahvzeQ.png', 'https://i.imgur.com/TEItueF.png',
        'https://i.imgur.com/FBepye3.png'
    ];


    const imgIdPattern = /\/(\d+)\./;
    const replaceImage = function (img) {
        const [,id] = img.src.match(imgIdPattern);
        img.src = images[id];
    };

    if (location.href.match(/planet\/[0-9]+/)) { // on single planet overview use big image
        Array.from(document.querySelectorAll('#planetImage > img')).forEach((img) => replaceImage(img));
    } else { // small images for anything else (planet list, nav other planets, nav own planets)
        Array.from(document.querySelectorAll('.planetImage img, .planets > img, .planets > a > img')).forEach((img) => replaceImage(img, 'icon'));
    }
})();
