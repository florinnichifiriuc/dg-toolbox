import {Component, inject, OnInit} from '@angular/core';
import {StatsPanel} from "../../../darkgalaxy-ui-parser/model/planet-list/planet-list-stats-panel.model";
import {StatsPanelService} from "../../service/stats-panel/stats-panel.service";
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {faGem as fasGem} from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'dg-toolbox-stats-panel',
    templateUrl: './stats-panel.component.html',
    styleUrls: ['./stats-panel.component.css']
})
export class StatsPanelComponent implements OnInit {
    private statsPanelService: StatsPanelService = inject(StatsPanelService);
    protected panel: StatsPanel;

    constructor(library: FaIconLibrary) {
        library.addIcons(fasGem);
    }

    ngOnInit() {
        this.panel = this.statsPanelService.extractStats();
    }

}
