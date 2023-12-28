import {Component, OnDestroy, OnInit} from "@angular/core";
import { Subscription } from "rxjs";
import { BackendService } from "../backend.service";

@Component ({
    templateUrl:"header.component.html",
    selector:"app-header",
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy{
    private userSub!: Subscription;
    isAuthenticated = false;

    constructor(private backendService: BackendService) {}

    ngOnInit(): void {
        this.userSub = this.backendService.user.subscribe(user => {
            this.isAuthenticated = !!user;
        });
    }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();

  }
    

}