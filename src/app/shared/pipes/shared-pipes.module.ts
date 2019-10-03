import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {KeysPipePipe} from './keys-pipe.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [KeysPipePipe]
})
export class SharedPipesModule { }
