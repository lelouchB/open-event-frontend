import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    saveCode(discountCode) {
      discountCode.save()
        .then(() => {
          this.get('notify').success(this.get('l10n').t('Discount code has been successfully created.'));
          this.transitionToRoute('events.view.tickets.discount-codes');
        })
        .catch(() => {
          this.get('notify').error(this.get('l10n').t('An unexpected error has occured. Discount code cannot be created.'));
        });
    }
  }
});
