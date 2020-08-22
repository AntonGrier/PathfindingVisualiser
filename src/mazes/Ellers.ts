import MazeGenerator from './MazeGenerator';
import { Position, GRID_W, GRID_H } from '../IPathfinder';
import WallCarver, { ADJUSTED_WIDTH, ADJUSTED_HEIGHT } from './wallCarver';

export default class Ellers extends WallCarver {
    public generateWalls(): Position[] {
        this.wallsCreatedInOrder = [];
        this.generateMaze();
        return this.wallsCreatedInOrder;
    }

    private generateMaze(): void {
        let currentRow: Uptree = new Uptree();
        currentRow = this.mergeRow(currentRow, 0, true);
        for (let y = 1; y < ADJUSTED_HEIGHT; y++) {
            let prevRow = currentRow;
            currentRow = this.extendToNextRow(currentRow, prevRow, y);
            currentRow = this.mergeRow(currentRow, y, y !== ADJUSTED_HEIGHT - 1);
        }
    }
    extendToNextRow(currentRow: Uptree, prevRow: Uptree, rowIdx: number) {
        currentRow = new Uptree();
        for (let x = 0; x < ADJUSTED_WIDTH; x++) {
            if (prevRow.isRoot(x)) {
                currentRow.addEntry(x, -1);
                this.addTopWall({ x: x, y: rowIdx });
            } else if (this.randomBool()) {
                currentRow.addEntry(x, prevRow.getEntry(x));
                this.addTopWall({ x: x, y: rowIdx });
            }
        }
        return currentRow;
    }

    private mergeRow(row: Uptree, rowIdx: number, random: boolean) {
        for (let i = 0; i < ADJUSTED_WIDTH - 1; i++) {
            if ((this.randomBool() || !random) && !row.sameClass(i, i + 1)) {
                row.mergeSets(i, i + 1);
                this.addRightWall({ x: i, y: rowIdx });
            }
        }
        return row;
    }
    addRightWall(pos: Position): void {
        this.addWall({ x: 2 * pos.x + 2, y: 2 * pos.y + 1 });
    }

    addTopWall(pos: Position): void {
        this.addWall({ x: 2 * pos.x + 1, y: 2 * pos.y });
    }

    private randomBool(): boolean {
        return Math.random() >= 0.5;
    }
}

class Uptree {
    data: number[];
    constructor() {
        this.data = Array(ADJUSTED_WIDTH).fill(-1);
    }

    public mergeSets(set1: number, set2: number): void {
        if (this.data[set1] === -1) {
            this.data[set1] = this.getRoot(set2);
        } else {
            this.data[set2] = this.getRoot(set1);
        }
    }

    public sameClass(index1: number, index2: number) {
        return this.getRoot(index1) === this.getRoot(index2);
    }

    public getRoot(index: number): number {
        while (this.data[index] !== -1) {
            index = this.data[index];
        }
        return index;
    }

    public isRoot(index: number): boolean {
        return this.data[index] === -1;
    }

    public addEntry(index: number, value: number) {
        this.data[index] = value;
    }

    public getEntry(index: number): number {
        return this.getRoot(index);
    }
}
