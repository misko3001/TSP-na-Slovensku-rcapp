import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {FormGroup, Validators} from "@angular/forms";
import {TSPSelector, TSPSelector2LabelMapping, TSPSelector2ModifierDescription} from "../../shared/model/TSPSelector";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-selector-form',
  templateUrl: './selector-form.component.html',
  styleUrls: ['./selector-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorFormComponent {

  @Input()
  selectorForm!: FormGroup;

  public selector2Label: Record<TSPSelector, string> = TSPSelector2LabelMapping;

  public selector2ModifierDescription: Record<TSPSelector, string | null> = TSPSelector2ModifierDescription;

  public selectorTypes = Object.values(TSPSelector);

  public enableParentSelectorForm: boolean = false;

  public enableParentEliteInput: boolean = false;

  public enableOffspringEliteInput: boolean = false;

  constructor(private cd: ChangeDetectorRef, private sanitizer: DomSanitizer) {
  }

  public getModifierDescription(type: string): SafeHtml | null {
    let selector: TSPSelector = this.selectorForm.controls[type + 'Selector'].value;
    if (selector != null) {
      let description = this.selector2ModifierDescription[selector];
      if (description) {
        return this.sanitizer.bypassSecurityTrustHtml(description +
        '<style>[data-tooltip]::before {\n' +
          '  content: attr(data-tooltip);\n' +
          '  position: absolute;\n' +
          '  opacity: 0;\n' +
          '\n' +
          '  padding: 10px;\n' +
          '  color: #333;\n' +
          '  max-width: 250px;' +
          '  border-radius: 10px;\n' +
          '  box-shadow: 2px 2px 1px silver;\n' +
          '}\n' +
          '\n' +
          '[data-tooltip]:hover::before {\n' +
          '  opacity: 1;\n' +
          '\n' +
          '  background: #f1f1f1;\n' +
          '  font-size: 12px; ' +
          '  max-width: 250px;' +
          '  margin-top: -100px;\n' +
          '}</style>');
      }
    }
    return null;
  }

  public enableParentForm(): void {
    this.enableParentSelectorForm = !this.enableParentSelectorForm;
    let control = this.selectorForm.controls['parentSelector'];
    control.clearValidators();
    if (this.enableParentSelectorForm) {
      control.addValidators([Validators.required]);
    } else {
      control.setValue(null);
    }
    this.cd.detectChanges();
  }

  public enableOffspringElite(): void {
    this.enableOffspringEliteInput = !this.enableOffspringEliteInput;
    let control = this.selectorForm.controls['offspringEliteSelectorValue'];
    control.clearValidators();
    if (this.enableOffspringEliteInput) {
      control.addValidators([Validators.required]);
      control.setValue(1);
    } else {
      control.setValue(null);
    }
    this.cd.detectChanges();
  }

  public enableParentElite(): void {
    this.enableParentEliteInput = !this.enableParentEliteInput;
    let control = this.selectorForm.controls['parentEliteSelectorValue'];
    control.clearValidators();
    if (this.enableParentEliteInput) {
      control.addValidators([Validators.required]);
      control.setValue(1);
    } else {
      control.setValue(null);
    }
    this.cd.detectChanges();
  }

}
