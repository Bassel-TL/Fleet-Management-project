import { Component, OnInit } from '@angular/core';
import { Music } from '../domains/Music';
import { MusicService } from '../services/music.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class MusicComponent implements OnInit {

  musicDialog: boolean;

  musics: Music[];

  music: Music;

  selectedMusics: Music[];

  submitted: boolean;

  statuses: any[];


  selectedMusic: Music = null;
  constructor(private musicService: MusicService, private messageService: MessageService, private confirmationService: ConfirmationService) {​​ }​​

  ngOnInit() {
    this.musicService.getAllMusics().then(data => this.musics = data);
  }

openNew() {
  this.musicDialog = true;
    this.music = {};
    this.submitted = false;

}

editMusic(music: Music) {
  this.music = {...music};
  this.musicDialog = true;
}
deleteMusic(music: Music) {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + music.ID + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.musics = this.musics.filter(val => val.ID !== music.ID);
          this.music = null;
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Music Deleted', life: 3000});
      }
  });
}
hideDialog() {
  this.musicDialog = false;
  this.submitted = false;
}
saveMusic() {
  this.submitted = true;
  if (this.music.description.trim()) {
      if (this.music.ID) {
          this.musicService.updateMusic(this.music);
          this.musics[this.findIndexById(this.music.ID)] = this.music;                
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Music Updated', life: 3000});
      }
      else {
          this.music.ID = this.createId();
          this.musicService.addMusic(this.music);
          this.musics.push(this.music);
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Music Created', life: 3000});
      }

      this.musics = [...this.musics];
      this.musicDialog = false;
      this.music = null;
  }
}
findIndexById(id:number): number {
  let index = -1;
  for (let i = 0; i < this.musics.length; i++) {
      if (this.musics[i].ID === id) {
          index = i;
          break;
      }
  }

  return index;
}
createId(): number {
  let max = 0;
  for ( var i = 0; i < this.musics.length; i++ ) {
     if(this.musics[i].ID > max)
     {
       max = this.musics[i].ID;
     }
  }
  return max+1;
}

}
