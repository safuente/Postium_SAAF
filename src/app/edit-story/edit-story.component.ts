import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Post } from '../post';
import { PostService } from '../post.service';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-story',
  templateUrl: './edit-story.component.html',
  styleUrls: ['./edit-story.component.css']
})
export class EditStoryComponent implements OnDestroy {
  private _postSubscription: Subscription;
  
  

    constructor(
      private _postService: PostService,
      private _router: Router,private _route: ActivatedRoute) { 
        
      }
      
    ngOnDestroy(): void {
      this._unsubscribePostUpdate();
    }
  
    updatePost(post: Post): void {
     
      this._unsubscribePostUpdate();
      
      this._postSubscription = this._postService
                                   .updatePost(post,this._route.snapshot.params.postId)
                                   .subscribe(() => this._router.navigate(['/']));
    }
  
    private _unsubscribePostUpdate(): void {
      if (this._postSubscription) {
        this._postSubscription.unsubscribe();
      }
    }
  
  }