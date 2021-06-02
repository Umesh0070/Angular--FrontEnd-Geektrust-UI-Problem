import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSelectModule } from '@angular/material/select'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule} from '@angular/material/card'
import { FormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS} from '@angular/material/radio';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeScreenComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSelectModule,
    NoopAnimationsModule,
    MatCardModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatRadioModule,
    MatProgressBarModule,
    MatButtonModule,
    BrowserAnimationsModule
  ],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
