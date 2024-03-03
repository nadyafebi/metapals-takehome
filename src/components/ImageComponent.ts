import { Component } from "../engine";

export class ImageComponent extends Component {
  src: string;

  constructor(src: string) {
    super();
    this.src = src;
  }
}
