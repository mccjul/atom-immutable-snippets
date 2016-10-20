'use babel';

import ImmutableSnippitsView from './immutable-snippits-view';
import { CompositeDisposable } from 'atom';

export default {

  immutableSnippitsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.immutableSnippitsView = new ImmutableSnippitsView(state.immutableSnippitsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.immutableSnippitsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'immutable-snippits:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.immutableSnippitsView.destroy();
  },

  serialize() {
    return {
      immutableSnippitsViewState: this.immutableSnippitsView.serialize()
    };
  },

  toggle() {
    console.log('ImmutableSnippits was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
