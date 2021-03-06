import Controller from '@ember/controller';
export default Controller.extend({
  actions: {
    async save() {
      let _this = this;
      await this.get('model.session').save();
      if (this.addNewSpeaker) {
        let newSpeaker = this.get('model.speaker');
        if (newSpeaker.isEmailOverridden) {
          newSpeaker.set('email', this.authManager.currentUser.email);
        }
        newSpeaker.save()
          .then(() => {
            newSpeaker.sessions.pushObject(_this.get('model.session'));
            _this.get('model.session').save()
              .then(() => {
                _this.get('notify').success(_this.get('l10n').t('Your session has been saved'));
                _this.transitionToRoute('events.view.sessions', _this.get('model.event.id'));
              })
              .catch(() =>   {
                _this.get('notify').error(this.l10n.t('Oops something went wrong. Please try again'));
              })
              .finally(() => {
                _this.set('isLoading', false);
              });
          })
          .catch(() =>   {
            this.notify.error(this.l10n.t('Oops something went wrong. Please try again'));
          })
          .finally(() => {
            this.set('isLoading', false);
          });
      } else {
        this.get('model.session').save()
          .then(() => {
            this.notify.success(this.l10n.t('Your session has been saved'));
            this.transitionToRoute('events.view.sessions', this.get('model.event.id'));
          })
          .catch(() => {
            this.notify.error(this.l10n.t('Oops something went wrong. Please try again'));
          })
          .finally(() => {
            this.set('isLoading', false);
          });
      }

    }
  }
});
