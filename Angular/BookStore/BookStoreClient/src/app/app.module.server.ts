import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    AppRoutingModule,
    ServerModule,
  ],
  bootstrap: [AppRoutingModule],
})
export class AppServerModule {}
