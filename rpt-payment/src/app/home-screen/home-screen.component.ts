import { Component, OnInit, Inject, ChangeDetectionStrategy, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { ProductBenefits } from '../common/model/product-benefits';
import { ProductsDemosService } from '../_services/products-demos.service';
import { ProjectDemo } from '../common/model/project-demo';
import { UserProfile } from '../common/model/user-profile';
import { UserDataService } from '../_services/user-data.service';
import { RedhatTechnologies } from '../../app/common/model/redhat-technologies';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent implements OnInit {
  @ViewChild('panel', { read: ElementRef }) public panel: ElementRef<any>;
  productBenefits: ProductBenefits[] | null;
  productDemos: ProjectDemo[] | null;
  productDemo: ProjectDemo | null;
  systemUsers: UserProfile | null;
  selectedUser: UserProfile | null;
  selectedProject: ProjectDemo | null;
  users: UserProfile[] | null;
  redhatTech: RedhatTechnologies[] | null;

  constructor(private productsDemosService: ProductsDemosService, private userDataService: UserDataService) { }

  ngOnInit() {
    // user data
    this.userDataService.getSystemUsers()
      .subscribe((userData: UserProfile[]) => {
        this.users = userData;
      });

    // card information
    this.productsDemosService.getProductBenefits()
    .subscribe((benefits: ProductBenefits[]) => {
      this.productBenefits = benefits;
    });

    // all project types
    this.productsDemosService.getProductDemos()
      .subscribe((demos: ProjectDemo[]) => {
        console.log(demos);
        this.productDemos = demos;
      });

    // selected project
    this.productsDemosService.getSelectedDemo()
    .subscribe((projectDemo: ProjectDemo) => {
      this.productDemo = projectDemo;
    });

    this.productsDemosService.getRedHatTechnologies()
      .subscribe((redhatTechnologies: RedhatTechnologies[]) => {
        this.redhatTech = redhatTechnologies;
      });
  }

  public onPreviousSearchPosition(): void {
    this.panel.nativeElement.scrollLeft -= 200;
  }

  public onNextSearchPosition(): void {
    this.panel.nativeElement.scrollLeft += 200;
  }

  getProductBenefits() {
    return this.productBenefits;
  }

  getUsers() {
    return this.systemUsers;
  }

  setUser($event) {
    this.userDataService.setUser(this.selectedUser);
  }

  setProject($event) {
    this.productsDemosService.setSelectedDemo(this.selectedProject);
    this.filterRedHatTech();
  }

  private filterRedHatTech() {
    this.productsDemosService.getRedHatTechnologies()
    .subscribe((technologies: RedhatTechnologies[]) => {

      this.redhatTech = technologies;
    });
  }

}
