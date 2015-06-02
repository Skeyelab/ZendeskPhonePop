(function() {

  var TICKET_POP_URI = '/api/v2/channels/voice/tickets.json';

  return {
    requests: {

      popTicket: function(data) {
        return {
          url: TICKET_POP_URI,
          type: 'POST',
          dataType: 'json',
          data: JSON.stringify(data),
          contentType: 'application/json',
          proxy_v2: true
        };
      }
    },
    events: {
      'app.activated': 'intialize',
      'click .btn': 'displayPanel',
      'click .button-confirm': 'createTicketAndPop',
      'popTicket.done': function() {
        this.popover('hide');
      }
    },

    intialize: function() {
      this.switchTo('button');

    },

    displayPanel: function() {
      this.switchTo('panel');
    },


    createTicketAndPop: function() {
      this.security_code = this.$('.security_code').val();
      this.country = this.$('.country').val();
      this.customer_language = this.$('.customer_language').val();
      this.email_address = this.$('.email_address').val();
      var data = {
        "display_to_agent": this.currentUser().id(),
        "ticket": {
          "subject": "Phone Ticket",
          "requester": {
            "email": this.email_address
          },
          "tags": ["phone"],
          "custom_fields": [{
            "id": this.setting('security_code'),
            "value": this.security_code
          }, {
            "id": this.setting('country'),
            "value": this.country
          }, {
            "id": this.setting('customer_language'),
            "value": this.customer_language
          }],
          "comment": {
            "body": "Phone Ticket created by Phone Pop App",
            "public": false
          },
          "priority": "urgent",
          "via_id": 45,
          "assignee_id": this.currentUser().id()
        }
      };

      this.ajax('popTicket', data);

    }
  };

}());