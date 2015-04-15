(function() {

  var TICKET_POP_URI = '/api/v2/channels/voice/tickets.json';

  return {
    requests: {

      popTicket: function(data) {
        return {
          url:         TICKET_POP_URI,
          type:        'POST',
          data:        data
        };
      }
    },
    events: {
      'app.activated':'intialize',
      'pane.activated':'createTicketAndPop',
      'popTicket.done': function() {
		this.popover('hide');
       }
    },

    intialize: function() {
        this.switchTo('button');
    },
    createTicketAndPop: function() {
		var data = {"display_to_agent":this.currentUser().id(),"ticket":{"subject":"Phone Ticket","comment":{"body":"Phone Ticket created by Phone Pop App","public":false},"priority":"urgent","via_id":45,"assignee_id":this.currentUser().id()}};
		this.ajax('popTicket', data);
    }
  };

}());

