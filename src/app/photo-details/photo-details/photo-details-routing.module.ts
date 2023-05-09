import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotoDetailsComponent } from 'src/app/photo-details/photo-details.component';

const routes: Routes = [
  {
    path: ':photoId',
    component: PhotoDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhotoDetailsRoutingModule {}
