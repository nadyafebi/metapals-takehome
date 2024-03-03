import { Component } from "../engine";

export class GameStateComponent extends Component {
  started = false;
  time = 0;
  clicks = 0;
  win = false;
}
