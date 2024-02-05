sap.ui.define([
    "sap/m/MessageToast",
    "/sap/ui/model/json/JSONModel",
    "/sap/ui/model/odata/v4/ODataModel",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Input",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"

], function (MessageToast, JSONModel, ODataModel, Dialog, Button, Input, Filter, FilterOperator) {
    'use strict';

    return {
        OpenReplyTableApp: function (oEvent) {
            let sReplyTableListPage = "https://freeplan-takm41tp.launchpad.cfapps.us10.hana.ondemand.com/f34ff8d7-e2c8-486f-89fb-24a33b505ede.twreplytablemaintainreplytable.twreplytablemaintainreplytable-0.0.1/index.html";

            //MessageToast.show("Custom handler invoked.");

            //Replytable OData v4 service
            let sODataServiceUrl = '/sap/opu/odata4/sap/zz_ui_replytable/srvd/sap/zz_sd_replytable/0001/';
            let oModel = new ODataModel({
                serviceUrl: sODataServiceUrl,
                synchronizationMode: "None", //Not needed according to demo kit
                autoExpandSelect: true,
                groupId: "$auto",
                operationMode: "Server"
            });

            //let oJsonModel = new JSONModel();

            let oDialog = new Dialog({
                title: "Enter Replytable",
                content: [
                    new Input("replyTableInput", { placeholder: "ReplyTable" })
                ],
                beginButton: new Button({
                    text: "Submit",
                    press: function () {
                        let sReplyTable = sap.ui.getCore().byId("replyTableInput").getValue();

                        // Create a context binding to the Replytable Entityset                        
                        let oListBinding = oModel.bindList("/ReplyTable");

                        //Create filter to get the requested replytable
                        oListBinding.filter(new Filter("ReplyTable", FilterOperator.EQ, sReplyTable.toUpperCase()));

                        //Get replytable data 
                        oListBinding.requestContexts().then(function (aContexts) {
                            if (aContexts && aContexts.length > 0) {
                                let sUUID = aContexts[0].getProperty("ReplyTableUUID");

                                //Construct the url                                
                                let sUrl2 = '#/ReplyTable(ReplyTableUUID=' + encodeURIComponent(sUUID) + ',IsActiveEntity=true)';
                                //let sUrl = sUrl1 + sUrl2;
                                let sUrl = sReplyTableListPage + sUrl2;

                                window.open(sUrl, "_blank");
                                oDialog.close();
                            } else if (aContexts.length === 0 && !sReplyTable === '') {
                                window.open(sReplyTableListPage, "_blank");
                                oDialog.close();
                            } else {                                
                                window.open(sReplyTableListPage, "_blank");
                                oDialog.close();
                            }

                        }).catch(function (oError) {
                            console.error("Error fetching data", oError);
                        });

                    }
                }),
                endButton: new Button({
                    text: "Cancel",
                    press: function () {
                        oDialog.close();
                    }
                }),
                afterClose: function () {
                    oDialog.destroy();
                }

            });

            oDialog.open();

        }
    };
});
