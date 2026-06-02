import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {changeDetection} from '@demo/emulate/change-detection';
import {encapsulation} from '@demo/emulate/encapsulation';
import {TuiPlatform} from '@taiga-ui/cdk';
import {TUI_OPTIONS, TuiCell, TuiTitle} from '@taiga-ui/core';
import {TuiAvatar, TuiSegmented} from '@taiga-ui/kit';
import {TuiAppBar, TuiAppBarBack, TuiDynamicHeader, TuiHeader} from '@taiga-ui/layout';
import {PolymorpheusComponent, PolymorpheusOutlet} from '@taiga-ui/polymorpheus';

@Component({
    imports: [
        FormsModule,
        TuiAppBar,
        TuiAppBarBack,
        TuiAvatar,
        TuiCell,
        TuiDynamicHeader,
        TuiHeader,
        TuiTitle,
    ],
    template: `
        <tui-app-bar>
            <button
                title="Back"
                tuiAppBarBack
                tuiSlot="start"
                type="button"
            ></button>
            <div tuiDynamicHeader></div>
        </tui-app-bar>
        <div class="content">
            <div
                *tuiDynamicHeaderAnchor
                tuiHeader="h6"
            >
                <h6 tuiTitle>
                    Title 1
                    <div tuiSubtitle>Subtitle</div>
                </h6>
            </div>
            @for (_ of '-'.repeat(7); track $index) {
                <div tuiCell>
                    <div
                        appearance="primary"
                        tuiAvatar="@tui.star"
                    ></div>
                    <div tuiTitle>
                        Title
                        <div tuiSubtitle>Description</div>
                    </div>
                </div>
            }

            <div
                *tuiDynamicHeaderAnchor
                tuiHeader="h6"
            >
                <h6 tuiTitle>Title 2</h6>
            </div>
            @for (_ of '-'.repeat(15); track $index) {
                <div tuiCell>
                    <div
                        appearance="secondary"
                        tuiAvatar="@tui.heart"
                    ></div>
                    <div tuiTitle>
                        Title
                        <div tuiSubtitle>Description</div>
                    </div>
                </div>
            }

            <div
                *tuiDynamicHeaderAnchor
                tuiHeader="h6"
            >
                <h6 tuiTitle>Title 3 Long title</h6>
            </div>
            @for (_ of '-'.repeat(15); track $index) {
                <div tuiCell>
                    <div
                        appearance="secondary"
                        tuiAvatar="@tui.heart"
                    ></div>
                    <div tuiTitle>
                        Title
                        <div tuiSubtitle>Description</div>
                    </div>
                </div>
            }
        </div>
    `,
    styles: `
        tui-app-bar {
            position: sticky;
            z-index: 1;
            inset-block-start: -0.5px;
            margin-bottom: 0.75rem;
            background: var(--tui-background-base);

            ._liquid-glass {
                & {
                    background: transparent;
                }
            }
        }

        ._liquid-glass {
            .content > [tuiHeader] {
                transition: opacity 300ms linear;
            }

            .content > [tuiHeader]._hidden {
                opacity: 0;
            }
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {}

@Component({
    imports: [PolymorpheusOutlet, TuiDynamicHeader, TuiPlatform, TuiSegmented],
    templateUrl: './index.html',
    styleUrl: './index.less',
    encapsulation,
    changeDetection,
})
export default class Example {
    protected readonly apis = inject(TUI_OPTIONS).apis;
    protected activeItemIndex = 0;
    protected readonly content = new PolymorpheusComponent(ListComponent);
}
