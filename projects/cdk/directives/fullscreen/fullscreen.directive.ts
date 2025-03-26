import {DOCUMENT} from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    inject,
    Input,
    Output,
    signal,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import {TuiRoot} from '@taiga-ui/core/components/root';

@Component({
    standalone: true,
    selector: '[tuiFullscreen]',
    imports: [TuiRoot],
    template: '<tui-root #root><ng-content /></tui-root>',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '(document:fullscreenchange)': 'onFullscreenChange($event)',
    },
})
export class TuiFullscreen {
    @ViewChild('root', {read: ElementRef})
    private readonly root?: ElementRef<HTMLElement>;

    private readonly doc = inject(DOCUMENT);
    private readonly state = signal(false);

    @Output()
    public readonly fullscreenEnabled = new EventEmitter<boolean>();

    @Input('tuiFullscreenOptions')
    public options?: FullscreenOptions = {navigationUI: 'show'};

    @Input('tuiFullscreen')
    public set fullscreen(state: boolean) {
        if (this.state() === state) {
            return;
        }

        this.state.set(state);

        if (this.state()) {
            this.root?.nativeElement
                .requestFullscreen(this.options)
                .then(() => this.fullscreenEnabled.emit(true));
        } else {
            this.doc.exitFullscreen().then(() => this.fullscreenEnabled.emit(false));
        }
    }

    protected onFullscreenChange(event: Event): void {
        const closed =
            !this.doc.fullscreenElement &&
            (event.target as Element) === this.root?.nativeElement;

        if (closed) {
            this.state.set(false);
            this.fullscreenEnabled.emit(false);
        }
    }
}
