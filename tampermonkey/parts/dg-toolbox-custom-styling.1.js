function applyCustomStyling() {
    document.querySelectorAll('#planetList > #planetList').forEach((planet) => {
        planet.querySelector('.planetImage img').setAttribute('width', 75);
        planet.querySelector('.planetImage img').setAttribute('height', 75);

        if (planet.querySelectorAll('.planetHeadSection').length > 3) {
            planet.querySelector('.planetImage').classList.add('dgt-no-bottom-radius');
        }

    });

    document.querySelectorAll('.resource span').forEach((resource) => {
        resource.innerHTML = resource.innerHTML.replace(/\(/g, '[').replace(/\)/g, ']');
    });

    if (document.querySelector('#fleetHeader')) {
        document.querySelector('#fleetHeader').parentElement.querySelector('div.opacDarkBackground.left:nth-child(2)').style.marginRight = '3px';
    }

    if (document.querySelector('#completed .tableHeader')) {
        document.querySelector('#completed .tableHeader').remove();
        document.querySelectorAll('.queueDestroyButton, .queueRemoveButton, .addQueue').forEach((close) => {
            close.id = close.name;
            let label = document.createElement('label');
            label.htmlFor = close.id;
            label.classList.add('queueDestroyButton');
            if (close.classList.contains('addQueue')) label.classList.add('rotation45');
            if (close.classList.contains('prequeue')) label.classList.add('researchQueue');
            label.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><style>svg{fill:#535353}</style><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>';
            close.parentNode.insertBefore(label, close.nextSibling);
            close.style.display = 'none';
        });
        document.querySelectorAll('.queueDownButton').forEach((close) => {
            close.id = close.name;
            let label = document.createElement('label');
            label.htmlFor = close.id;
            label.classList.add('queueDownButton');
            label.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 464a208 208 0 1 1 0-416 208 208 0 1 1 0 416zM256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM376.9 294.6c4.5-4.2 7.1-10.1 7.1-16.3c0-12.3-10-22.3-22.3-22.3H304V160c0-17.7-14.3-32-32-32l-32 0c-17.7 0-32 14.3-32 32v96H150.3C138 256 128 266 128 278.3c0 6.2 2.6 12.1 7.1 16.3l107.1 99.9c3.8 3.5 8.7 5.5 13.8 5.5s10.1-2 13.8-5.5l107.1-99.9z"/></svg>';
            close.parentNode.insertBefore(label, close.nextSibling);
            close.style.display = 'none';
        });
        document.querySelectorAll('.queueUpButton').forEach((close) => {
            close.id = close.name;
            let label = document.createElement('label');
            label.htmlFor = close.id;
            label.classList.add('queueUpButton');
            label.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM135.1 217.4c-4.5 4.2-7.1 10.1-7.1 16.3c0 12.3 10 22.3 22.3 22.3H208v96c0 17.7 14.3 32 32 32h32c17.7 0 32-14.3 32-32V256h57.7c12.3 0 22.3-10 22.3-22.3c0-6.2-2.6-12.1-7.1-16.3L269.8 117.5c-3.8-3.5-8.7-5.5-13.8-5.5s-10.1 2-13.8 5.5L135.1 217.4z"/></svg>';
            close.parentNode.insertBefore(label, close.nextSibling);
            close.style.display = 'none';
        });

        document.querySelectorAll('#completed .upkeepList').forEach((building) => {
            building.querySelector('.width65').remove();
            building.querySelector('.ground:last-child').classList.add('orbit');
            building.querySelector('.ground:last-child').classList.remove('ground');
            building.querySelectorAll('.left').forEach((part) => {
                if (part.textContent.trim().length == 0) part.remove();
                if (part.classList.contains('width25') || part.classList.contains('width50')) {
                    part.classList.remove('width25');
                    part.classList.remove('width50');
                    part.classList.add('width100');
                }
            });
        });
    }

    console.log("%cDGT%c - installed custom styles...", "font-size: 12px; font-weight: bold;", "font-size: 12px;");
}
