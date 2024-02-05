sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'com/tw/mrc/test/integration/FirstJourney',
		'com/tw/mrc/test/integration/pages/MRCList',
		'com/tw/mrc/test/integration/pages/MRCObjectPage',
		'com/tw/mrc/test/integration/pages/MRCBuildObjectPage'
    ],
    function(JourneyRunner, opaJourney, MRCList, MRCObjectPage, MRCBuildObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('com/tw/mrc') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheMRCList: MRCList,
					onTheMRCObjectPage: MRCObjectPage,
					onTheMRCBuildObjectPage: MRCBuildObjectPage
                }
            },
            opaJourney.run
        );
    }
);