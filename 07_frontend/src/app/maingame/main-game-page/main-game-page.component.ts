import { Component, ViewChildren, QueryList, OnInit } from '@angular/core';
import {
  HttpClientModule,
  HttpClient,
  HttpResponse,
} from '@angular/common/http';
import { GridComponent } from '../grid/grid.component';
import { AuthService } from '../../auth.service';
import { ActivatedRoute, Route } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-main-game-page',
  standalone: true,
  imports: [GridComponent, HttpClientModule],
  templateUrl: './main-game-page.component.html',
  styleUrl: './main-game-page.component.css',
  providers: [AuthService],
})
export class MainGamePageComponent implements OnInit {
  humanScore = 3;
  computerScore = 2;
  readonly totalScore = 5;

  currentTurn: 'Human' | 'Bot' = 'Human';

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute, private http: HttpClient,
    private snackBar: MatSnackBar ) {}

  ngOnInit() {
    let gameId = this.getGameId();

    if (!gameId) return;

    this.authService.request('GET', `game/data/${gameId}`).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response);
        this.humanScore = this.totalScore - response.body.player2ShipsLeft;
        this.computerScore = this.totalScore - response.body.player1ShipsLeft;
        this.makePreMoves(response.body.moves);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  @ViewChildren(GridComponent) gridComponents!: QueryList<GridComponent>;

  async handleIndexClicked(cell: { row: number; col: number }) {
    let shipIsHit = false;

    const isHit = await this.checkIndex(cell.row, cell.col);

    // Logic for checking the index
    if (!isHit) {
      alert('Not a ship.');
      shipIsHit = false;
    } else {
      alert('Ship found!');
      shipIsHit = true;
    }

    // Logic for changing turns
    if (this.currentTurn === 'Human') {
      // Get the Grid Component for Human
      const gridComponent = this.gridComponents.toArray()[1];

      // Handle it being a hit
      if (shipIsHit) {
        gridComponent.makeShipHit(cell);
      } else {
        this.currentTurn = 'Bot';
        this.makeBotMove();
      }
    } else {
      const gridComponent = this.gridComponents.toArray()[0];

      // Handle it being a hit
      if (shipIsHit) {
        gridComponent.makeShipHit(cell);
      } else {
        this.currentTurn = 'Human';
      }
    }
  }

  /** Responsible for making the bot's move */
  makeBotMove() {
    // Wait for 3 seconds before bot makes a move
    setTimeout(() => {
      // Logic for bot to make a move
      const botGridComponent = this.gridComponents.toArray()[0];

      // Iteratively check for a move and make it if it's valid
      while (true) {
        const row = Math.floor(Math.random() * 8) + 1;
        const col = Math.floor(Math.random() * 8) + 1;
        if (!botGridComponent.isButtonDisabled({ row, col })) {
          botGridComponent.makeAMove(row, col);
          break;
        }
      }
    }, 3000);
  }

  /** Placeholder for the API call. */
  checkIndex(row: number, col: number): Promise<boolean> {
    console.log('AAAAAAAAAAAAAAAAAAA');
    let gameId = this.getGameId();

    if (!gameId)
      return new Promise((resolve, reject) => reject(new Error('Invalid URL')));

    const dataToBeSent = {
      gameId: gameId,
      playertype: this.currentTurn,
      position: {
        x: col - 1,
        y: row - 1,
      },
    };

    console.log(dataToBeSent);

    let shipHitOrNot = true;

    return new Promise((resolve, reject) => {
      this.authService
        .request('POST', 'game/check-ship', dataToBeSent)
        .subscribe(
          (response: HttpResponse<any>) => {
            if (response.status === 202) {
              resolve(false);
            } else if (response.status === 204) {
              resolve(true);
              this.openWinDialog();
            } else if (response.status === 206) {
              console.log(`${this.currentTurn} has won`);
              resolve(true);
            } else {
              reject(new Error(`Unexpected status code: ${response.status}`));
            }
          },
          (error) => {
            console.error(error);
            reject(error);
          }
        );
    });
  }
  openWinDialog(): void {
    this.snackBar.open(
      `
    <h1>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, dolorem dignissimos veritatis voluptatum ipsum temporibus labore, itaque ratione illo, magnam tempora aspernatur repellendus explicabo quo eveniet aliquam eligendi blanditiis reprehenderit! Ipsam, tempore, natus labore possimus ducimus mollitia soluta iusto voluptatibus ab, quam illo consequuntur at nostrum odio iure repudiandae assumenda!
    </h1>
    `,
      'Close',
      {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['snackbar-custom-class'], // Add your custom class here
      }
    );
  }

  getGameId() {
    let gameId;
    this.activatedRoute.paramMap.subscribe((params) => {
      gameId = params.get('gameId')?.toString();
    });

    if (!gameId) {
      console.error('Game Id Not found!');
      return false;
    } else {
      return gameId;
    }
  }

  makePreMoves(moves: Array<{}>) {
    // Code for making the moves
  }
}
