import { Component } from "../engine";

export class TextComponent extends Component {
  text: string;

  constructor(text?: string) {
    super();
    this.text = text || "";
  }
}
