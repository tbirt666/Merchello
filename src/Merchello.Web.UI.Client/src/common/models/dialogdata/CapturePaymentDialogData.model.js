    /**
     * @ngdoc model
     * @name PaymentRequest
     * @function
     *
     * @description
     * A back office dialogData model used for making payment requests to a payment provider
     *
     * @note
     * Presently there is not a corresponding Merchello.Web model
     */
    var CapturePaymentDialogData = function() {
        var self = this;
        self.currencySymbol = '';
        self.invoiceKey = '';
        self.paymentKey = '';
        self.paymentMethodKey = '';
        self.invoiceBalance = 0.0;
        self.amount = 0.0;
        self.processorArgs = [];
    };

    CapturePaymentDialogData.prototype = (function() {

        // helper method to set required associated payment info
        function setPaymentData(payment) {
            this.paymentKey = payment.key;
            this.paymentMethodKey = payment.paymentMethodKey;
            this.paymentMethodName = payment.paymentMethodName;

        }

        //// helper method to set required associated invoice info
        function setInvoiceData(payments, invoice, currencySymbol) {
            if (invoice !== undefined) {
                this.invoiceKey = invoice.key;
                this.invoiceBalance = invoice.remainingBalance(payments);
            }
            if (currencySymbol !== undefined) {
                this.currencySymbol = currencySymbol;
            }
        }

        function isValid() {
            return this.paymentKey !== '' && this.invoiceKey !== '' && this.invoiceBalance !==0;
        }

        return {
            setPaymentData: setPaymentData,
            setInvoiceData: setInvoiceData,
            isValid: isValid
        };

    }());

    angular.module('merchello.models').constant('CapturePaymentDialogData', CapturePaymentDialogData);
