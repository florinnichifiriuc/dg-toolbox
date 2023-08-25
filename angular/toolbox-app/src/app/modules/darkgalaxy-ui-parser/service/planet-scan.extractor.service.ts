import {inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {DataExtractor} from "./data-extractor";
import {PlanetScan} from "../../scans-in-cloud/model/planet-scan.model";
import {ScanType} from "../../scans-in-cloud/model/scan-type";
import {Resource} from "../../../model/resource.model";
import {PlanetScanEvent} from "../../scans-in-cloud/model/planet-scan-event.model";
import {NameQuantity} from "../../../model/name-quantity.model";
import {Structures} from "../../../model/structures";

@Injectable({
  providedIn: 'root'
})
export class PlanetScanExtractorService implements DataExtractor {
  private document: any = inject(DOCUMENT);

  constructor() {
  }

  extract(): PlanetScanEvent {
    // -- no scan
    if (this.document.querySelectorAll('#contentBox #planetHeader').length <= 1) {
      return null;
    }

    let planetScan: PlanetScan = new PlanetScan();
    let base: Element = this.document.querySelectorAll('#contentBox #planetHeader')[1];
    let scanType: ScanType;

    switch (base.querySelectorAll('.planetHeadSection .resource > span').length) {
      case 5: {
        scanType = ScanType.SURFACE;
        break;
      }
      case 2: {
        scanType = ScanType.RESOURCE;
        break;
      }
      case 0: {
        scanType = ScanType.FLEET;
        break;
      }
      default:
        scanType = ScanType.UNKNOWN;
    }

    let result = new PlanetScanEvent(planetScan, scanType);

    if (scanType === ScanType.RESOURCE || scanType === ScanType.SURFACE) {
      result.planetScan.orbit = parseInt(base.querySelectorAll('.planetHeadSection .resource > span')[0].textContent.trim());
      result.planetScan.ground = parseInt(base.querySelectorAll('.planetHeadSection .resource > span')[1].textContent.trim());
      result.planetScan.location = base.querySelectorAll('.planetHeadSection .coords')[0].textContent.trim().replace(/\s+/, '');

    }

    if (scanType === ScanType.RESOURCE) {
      base.querySelectorAll('.planetHeadSection .resourceRow:nth-child(2) > .data:not(:first-child)').forEach((abundance: Element) => {
        let resource: Resource = new Resource();
        resource.abundance = parseInt(abundance.textContent.trim());

        result.planetScan.resources.push(resource);
      });
    }

    if (scanType === ScanType.SURFACE) {
      base.querySelectorAll('.planetHeadSection .resourceRow:nth-child(2) > .data:not(:first-child)').forEach((production: Element) => {
        let resource: Resource = new Resource();
        resource.stored = parseInt(production.textContent.trim().replace(/,/g, ''));

        result.planetScan.resources.push(resource);
      });

      base.querySelectorAll('.planetHeadSection .resourceRow:nth-child(3) > .data:not(:first-child)').forEach((abundance: Element, index: number) => {
        result.planetScan.resources[index].abundance = parseInt(abundance.textContent.trim());
      });

      result.planetScan.workers.currentNumber = parseInt(base.querySelectorAll('.planetHeadSection .resource > span')[3].textContent.trim().split(/\//g)[0].replace(/,/g, ''));
      result.planetScan.workers.maximumNumber = parseInt(base.querySelectorAll('.planetHeadSection .resource > span')[3].textContent.trim().split(/\//g)[1].replace(/,/g, ''));
      result.planetScan.workers.available = parseInt(base.querySelectorAll('.planetHeadSection .resource > span')[4].textContent.trim().split(/\s+/)[0].replace(/[(,]/g, ''));

      result.planetScan.soldiers = parseInt(base.querySelectorAll('.planetHeadSection .resource > span')[2].textContent.trim().replace(/,/g, ''));

      base.parentElement.querySelectorAll('div.entry > .left:not(.structureImageSmall)').forEach((structure: Element) => {
        result.planetScan.structures.push(
          new NameQuantity(
            structure.textContent.split(/x\s+/)[1].trim().replace(/_/g, ' ').toLowerCase(),
            parseInt(structure.textContent.split(/x\s+/)[0].trim())
          )
        );
      });

      result.planetScan.structures.forEach((structure) => {
        switch (structure.name as Structures) {
          case Structures.OUTPOST: {
            result.planetScan.resources[0].production += 300;
            result.planetScan.resources[1].production += 200;
            result.planetScan.resources[2].production += 100;
            break;
          }
          case Structures.METAL_MINE: {
            result.planetScan.resources[0].production += structure.quantity * 300;
            break;
          }
          case Structures.MINERAL_EXTRACTOR: {
            result.planetScan.resources[1].production += structure.quantity * 200;
            break;
          }
          case Structures.FARM: {
            result.planetScan.resources[2].production += structure.quantity * 300;
            break;
          }
          case Structures.SOLAR_GENERATOR: {
            result.planetScan.resources[3].production += structure.quantity * 100;
            break;
          }

          case Structures.CORE_METAL_MINE: {
            result.planetScan.resources[0].production += structure.quantity * 900;
            break;
          }
          case Structures.CORE_MINERAL_EXTRACTOR: {
            result.planetScan.resources[1].production += structure.quantity * 600;
            break;
          }
          case Structures.HYDROPONICS_LAB: {
            result.planetScan.resources[2].production += structure.quantity * 900;
            break;
          }
          case Structures.SOLAR_ARRAY: {
            result.planetScan.resources[3].production += structure.quantity * 300;
            break;
          }

          case Structures.STRIP_METAL_MINE: {
            result.planetScan.resources[0].production += structure.quantity * 9000;
            break;
          }
          case Structures.STRIP_MINERAL_EXTRACTOR: {
            result.planetScan.resources[1].production += structure.quantity * 6000;
            break;
          }
          case Structures.HYDROPONICS_DOME: {
            result.planetScan.resources[2].production += structure.quantity * 9000;
            break;
          }
          case Structures.SOLAR_STATION: {
            result.planetScan.resources[3].production += structure.quantity * 3000;
            break;
          }
        }
      });
    }

    result.planetScan.resources.forEach((resource) => {
      resource.production = Math.ceil((resource.production * resource.abundance) / 100);
    });

    return result;
  }
}
