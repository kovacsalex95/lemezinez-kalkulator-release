/*!
 * LemezInez kerítéskalkulátor
 *
 * A self-contained widget for lemezinez.hu (UNAS). It turns fence dimensions
 * into a priced shopping list and can put the whole list into the shop's cart.
 *
 * Embed:   <div id="li-kalkulator"></div>  plus this file in a script tag.
 * Options: data-dry-run="1" on the container never touches the cart.
 *          data-live="0" uses the baked catalogue instead of live shop data.
 *          The cart and live data are only used on the shop's own domain
 *          (see SHOP_HOSTS).
 *
 * On the shop the widget reads current prices from the product pages (see
 * "Live catalogue"). The catalogue block below is the fallback for when that
 * fails; scripts/fetch_products.py regenerates it.
 * The installation rules live in RULES: every number there is an assumption
 * waiting for the owner's confirmation (see docs/szabalyok.md).
 */
(function (root) {
  "use strict";

/* PRODUCTS:BEGIN */
const CATALOGUE = {"fetched":"2026-10-22","source":"https://lemezinez.hu","products":[{"sku":"L-020","cartSku":"L__unas__020","name":"Végzáró C kerítésléchez","url":"https://lemezinez.hu/Vegzaro-C-keriteslechez","price":120,"family":"cap_c","colour":null},{"sku":"L-021","cartSku":"L__unas__021","name":"Végzáró Rusztikus kerítésléchez","url":"https://lemezinez.hu/Vegzaro-Rusztikus-keriteslechez","price":120,"family":"cap_rusztikus","colour":null},{"sku":"L-0002","cartSku":"L__unas__0002","name":"Felfogató klipsz C kerítésléchez","url":"https://lemezinez.hu/spd/L-0002/Felfogato-klipsz-C-keriteslechez","price":240,"family":"clip_c","colour":null},{"sku":"L-0019","cartSku":"L__unas__0019","name":"Felfogató klipsz rusztikus kerítésléchez","url":"https://lemezinez.hu/Muanyag-rogzito-klipsz-rusztikus-keriteslechez","price":240,"family":"clip_rusztikus","colour":null},{"sku":"L-0022","cartSku":"L__unas__0022","name":"Íves kerítésléc ALSÓ élvédő","url":"https://lemezinez.hu/Ives-keriteslec-ALSO-elvedo","price":129,"family":"edge_bottom_ives","colour":null,"variantName":"SZÍN","variantValues":["Antracit Szürke (Antracit léchez)","Csokibarna ( Dió léchez)","Barna ( Világos Dió léchez)"]},{"sku":"L-0021","cartSku":"L__unas__0021","name":"Íves kerítésléc FELSŐ élvédő","url":"https://lemezinez.hu/Ives-keriteslec-FELSO-elvedo-RAL7016-Antracit","price":129,"family":"edge_top_ives","colour":null,"variantName":"SZÍN","variantValues":["Antracit Szürke (Antracit léchez)","Csokibarna ( Dió léchez)","Barna ( Világos Dió léchez)"]},{"sku":"L-11244","cartSku":"L__unas__11244","name":"L-profil kerítéslécekhez, Antracit fényes, RAL7016","url":"https://lemezinez.hu/L-profil-keriteslecekhez-Antracit-fenyes-RAL7016","price":2190,"family":"profile_l","colour":"antracit_fenyes"},{"sku":"L-11242","cartSku":"L__unas__11242","name":"L-profil kerítéslécekhez, Antracit matt RAL7016","url":"https://lemezinez.hu/L-profil-keriteslecekhez-Antracit-matt-RAL7016","price":2190,"family":"profile_l","colour":"antracit_matt"},{"sku":"L-11243","cartSku":"L__unas__11243","name":"L-profil kerítéslécekhez, Aranytölgy 3D","url":"https://lemezinez.hu/L-profil-keriteslecekhez-Aranytolgy-3D","price":2190,"family":"profile_l","colour":"aranytolgy"},{"sku":"L-11241","cartSku":"L__unas__11241","name":"L-profil kerítéslécekhez, Dió","url":"https://lemezinez.hu/L-profil-keriteslecekhez-Dio","price":2190,"family":"profile_l","colour":"dio"},{"sku":"L-11247","cartSku":"L__unas__11247","name":"U-profil kerítéslécekhez, Antracit fényes, RAL7016","url":"https://lemezinez.hu/U-profil-keriteslecekhez-Antracit-fenyes-RAL7016","price":2190,"family":"profile_u","colour":"antracit_fenyes"},{"sku":"L-11246","cartSku":"L__unas__11246","name":"U-profil kerítéslécekhez, Antracit matt, RAL7016","url":"https://lemezinez.hu/U-profil-keriteslecekhez-Antracit-matt-RAL7016","price":2190,"family":"profile_u","colour":"antracit_matt"},{"sku":"L-11248","cartSku":"L__unas__11248","name":"U-profil kerítéslécekhez, Aranytölgy 3D","url":"https://lemezinez.hu/U-profil-keriteslecekhez-Aranytolgy-3D","price":2190,"family":"profile_u","colour":"aranytolgy"},{"sku":"L-11245","cartSku":"L__unas__11245","name":"U-profil kerítéslécekhez, Dió","url":"https://lemezinez.hu/U-profil-keriteslecekhez-Dio","price":2190,"family":"profile_u","colour":"dio"},{"sku":"L-11240","cartSku":"L__unas__11240","name":"Z-profil kerítéslécekhez, Antracit fényes, RAL7016","url":"https://lemezinez.hu/Z-profil-keriteslecekhez-Antracit-fenyes-RAL7016","price":2190,"family":"profile_z","colour":"antracit_fenyes"},{"sku":"L-11239","cartSku":"L__unas__11239","name":"Z-profil kerítéslécekhez, Antracit matt, RAL7016","url":"https://lemezinez.hu/Z-profil-keriteslecekhez-Antracit-matt-RAL7016","price":2190,"family":"profile_z","colour":"antracit_matt"},{"sku":"L-11238","cartSku":"L__unas__11238","name":"Z-profil kerítéslécekhez, Aranytölgy 3D","url":"https://lemezinez.hu/Z-profil-keriteslecekhez-Aranytolgy-3D","price":2190,"family":"profile_z","colour":"aranytolgy"},{"sku":"L-11237","cartSku":"L__unas__11237","name":"Z-profil kerítéslécekhez, Dió","url":"https://lemezinez.hu/Z-profil-keriteslecekhez-Dio","price":2190,"family":"profile_z","colour":"dio"},{"sku":"L-11234","cartSku":"L__unas__11234","name":"Popszegecs, 4x95mm, Antracit, RAL7016","url":"https://lemezinez.hu/Popszegecs-4x95mm-Antracit-RAL7016","price":24,"family":"rivet","colour":"antracit_matt"},{"sku":"L-11236","cartSku":"L__unas__11236","name":"Popszegecs, 4x95mm, Barna, RAL8003","url":"https://lemezinez.hu/Popszegecs-4x95mm-Barna-RAL8003","price":24,"family":"rivet","colour":"barna"},{"sku":"L-11235","cartSku":"L__unas__11235","name":"Popszegecs, 4x95mm, Csokibarna, RAL8017","url":"https://lemezinez.hu/Popszegecs-4x95mm-Csokibarna-RAL8017","price":24,"family":"rivet","colour":"csokibarna"},{"sku":"L-0016","cartSku":"L__unas__0016","name":"Fémcsavar, önfúró hatlapfejű, 4,8x19mm, Antracit, RAL7016","url":"https://lemezinez.hu/Femcsavar-onfuro-hatlapfeju-48x19mm-Antracit-RAL70","price":30,"family":"screw","colour":"antracit_matt"},{"sku":"L-0015","cartSku":"L__unas__0015","name":"Fémcsavar, önfúró hatlapfejű, 4,8x19mm, Barna, RAL8003","url":"https://lemezinez.hu/Femcsavar-onfuro-hatlapfeju-48x19mm-Barna-RAL8003","price":30,"family":"screw","colour":"barna"},{"sku":"L-0018","cartSku":"L__unas__0018","name":"Fémcsavar, önfúró hatlapfejű, 4,8x19mm, Csokibarna, RAL8017","url":"https://lemezinez.hu/Femcsavar-onfuro-hatlapfeju-48x19mm-Csokibarna-RAL","price":30,"family":"screw","colour":"csokibarna"},{"sku":"L-005","cartSku":"L__unas__005","name":"Budó léc , kétoldalas, Aranytölgy 3D","url":"https://lemezinez.hu/spd/L-005/Budo-lec-ketoldalas-Aranytolgy-3D","price":990,"family":"slat_budo","colour":"aranytolgy","variantName":"Hosszúság (cm)","length":{"min":30,"max":300,"deltas":[-693,-683,-673,-663,-653,-644,-634,-624,-614,-604,-594,-584,-574,-564,-554,-545,-535,-525,-515,-505,-495,-485,-475,-465,-455,-446,-436,-426,-416,-406,-396,-386,-376,-366,-356,-347,-337,-327,-317,-307,-297,-287,-277,-267,-257,-248,-238,-228,-218,-208,-198,-188,-178,-168,-158,-149,-139,-129,-119,-109,-99,-89,-79,-69,-59,-50,-40,-30,-20,-10,0,10,20,30,40,50,59,69,79,89,99,109,119,129,139,149,158,168,178,188,198,208,218,228,238,248,257,267,277,287,297,307,317,327,337,347,356,366,376,386,396,406,416,426,436,446,455,465,475,485,495,505,515,525,535,545,554,564,574,584,594,604,614,624,634,644,653,663,673,683,693,703,713,723,733,743,752,762,772,782,792,802,812,822,832,842,851,861,871,881,891,901,911,921,931,941,950,960,970,980,990,1000,1010,1020,1030,1040,1049,1059,1069,1079,1089,1099,1109,1119,1129,1139,1148,1158,1168,1178,1188,1198,1208,1218,1228,1238,1247,1257,1267,1277,1287,1297,1307,1317,1327,1337,1346,1356,1366,1376,1386,1396,1406,1416,1426,1436,1445,1455,1465,1475,1485,1495,1505,1515,1525,1535,1544,1554,1564,1574,1584,1594,1604,1614,1624,1634,1643,1653,1663,1673,1683,1693,1703,1713,1723,1733,1742,1752,1762,1772,1782,1792,1802,1812,1822,1832,1841,1851,1861,1871,1881,1891,1901,1911,1921,1931,1940,1950,1960,1970,1980],"values":{"241":"241 cm ","297":"297 cm "}}},{"sku":"L-006","cartSku":"L__unas__006","name":"Budó léc , kétoldalas, Dió","url":"https://lemezinez.hu/spd/L-006/Budo-lec-ketoldalas-Dio","price":990,"family":"slat_budo","colour":"dio","variantName":"Hosszúság (cm)","length":{"min":30,"max":300,"deltas":[-693,-683,-673,-663,-653,-644,-634,-624,-614,-604,-594,-584,-574,-564,-554,-545,-535,-525,-515,-505,-495,-485,-475,-465,-455,-446,-436,-426,-416,-406,-396,-386,-376,-366,-356,-347,-337,-327,-317,-307,-297,-287,-277,-267,-257,-248,-238,-228,-218,-208,-198,-188,-178,-168,-158,-149,-139,-129,-119,-109,-99,-89,-79,-69,-59,-50,-40,-30,-20,-10,0,10,20,30,40,50,59,69,79,89,99,109,119,129,139,149,158,168,178,188,198,208,218,228,238,248,257,267,277,287,297,307,317,327,337,347,356,366,376,386,396,406,416,426,436,446,455,465,475,485,495,505,515,525,535,545,554,564,574,584,594,604,614,624,634,644,653,663,673,683,693,703,713,723,733,743,752,762,772,782,792,802,812,822,832,842,851,861,871,881,891,901,911,921,931,941,950,960,970,980,990,1000,1010,1020,1030,1040,1049,1059,1069,1079,1089,1099,1109,1119,1129,1139,1148,1158,1168,1178,1188,1198,1208,1218,1228,1238,1247,1257,1267,1277,1287,1297,1307,1317,1327,1337,1346,1356,1366,1376,1386,1396,1406,1416,1426,1436,1445,1455,1465,1475,1485,1495,1505,1515,1525,1535,1544,1554,1564,1574,1584,1594,1604,1614,1624,1634,1643,1653,1663,1673,1683,1693,1703,1713,1723,1733,1742,1752,1762,1772,1782,1792,1802,1812,1822,1832,1841,1851,1861,1871,1881,1891,1901,1911,1921,1931,1940,1950,1960,1970,1980],"values":{"241":"241 cm ","297":"297 cm "}}},{"sku":"L-002","cartSku":"L__unas__002","name":"C kerítésléc , kétoldalas, Dió","url":"https://lemezinez.hu/spd/L-002/C-keriteslec-ketoldalas-Dio","price":1490,"family":"slat_c","colour":"dio","variantName":"Hosszúság méret (30cm-300cm)","length":{"min":30,"max":300,"deltas":[-1043,-1028,-1013,-998,-983,-969,-954,-939,-924,-909,-894,-879,-864,-849,-834,-820,-805,-790,-775,-760,-745,-730,-715,-700,-685,-671,-656,-641,-626,-611,-596,-581,-566,-551,-536,-522,-507,-492,-477,-462,-447,-432,-417,-402,-387,-373,-358,-343,-328,-313,-298,-283,-268,-253,-238,-224,-194,-194,-179,-164,-149,-134,-119,-104,-89,-75,-59,-48,-30,-15,0,15,30,45,60,75,89,104,119,134,149,164,179,194,209,224,238,253,268,283,298,313,328,343,358,373,387,402,417,432,447,462,477,492,507,522,536,551,566,581,596,611,626,641,656,671,685,700,715,730,745,760,775,790,805,820,834,849,864,879,894,909,924,939,954,969,983,998,1013,1028,1043,1058,1073,1088,1103,1118,1132,1147,1162,1177,1192,1207,1222,1237,1252,1267,1281,1296,1311,1326,1341,1356,1371,1386,1401,1416,1430,1445,1460,1475,1490,1505,1520,1535,1550,1565,1579,1594,1609,1624,1639,1654,1669,1684,1699,1714,1728,1743,1758,1773,1788,1803,1818,1833,1848,1863,1877,1892,1907,1922,1937,1952,1967,1982,1997,2012,2026,2041,2056,2071,2086,2101,2116,2131,2146,2161,2175,2190,2205,2220,2235,2250,2265,2280,2295,2310,2324,2339,2354,2369,2384,2399,2414,2429,2444,2459,2473,2488,2503,2518,2533,2548,2563,2578,2593,2608,2622,2637,2652,2667,2682,2697,2712,2727,2742,2757,2771,2786,2801,2816,2831,2846,2861,2876,2891,2906,2920,2935,2950,2965,2978],"values":{"68":"68 cm ","30":"30 cm ","121":"121 cm ","178":"178 cm ","277":"277 cm ","279":"279 cm "}}},{"sku":"L-004","cartSku":"L__unas__004","name":"C kerítésléc, kétoldalas, Antracit faminta","url":"https://lemezinez.hu/spd/L-004/C-keriteslec-ketoldalas-Antracit-faminta","price":1490,"family":"slat_c","colour":"antracit_faminta","variantName":"Hosszúság méret (30cm-300cm)","length":{"min":30,"max":300,"deltas":[-1043,-1028,-1013,-998,-983,-969,-954,-939,-924,-909,-894,-879,-864,-849,-834,-820,-805,-790,-775,-760,-745,-730,-715,-700,-685,-671,-656,-641,-626,-611,-596,-581,-566,-551,-536,-522,-507,-492,-477,-462,-447,-432,-417,-402,-387,-373,-358,-343,-328,-313,-298,-283,-268,-253,-238,-224,-194,-194,-179,-164,-149,-134,-119,-104,-89,-75,-59,-48,-30,-15,0,15,30,45,60,75,89,104,119,134,149,164,179,194,209,224,238,253,268,283,298,313,328,343,358,373,387,402,417,432,447,462,477,492,507,522,536,551,566,581,596,611,626,641,656,671,685,700,715,730,745,760,775,790,805,820,834,849,864,879,894,909,924,939,954,969,983,998,1013,1028,1043,1058,1073,1088,1103,1118,1132,1147,1162,1177,1192,1207,1222,1237,1252,1267,1281,1296,1311,1326,1341,1356,1371,1386,1401,1416,1430,1445,1460,1475,1490,1505,1520,1535,1550,1565,1579,1594,1609,1624,1639,1654,1669,1684,1699,1714,1728,1743,1758,1773,1788,1803,1818,1833,1848,1863,1877,1892,1907,1922,1937,1952,1967,1982,1997,2012,2026,2041,2056,2071,2086,2101,2116,2131,2146,2161,2175,2190,2205,2220,2235,2250,2265,2280,2295,2310,2324,2339,2354,2369,2384,2399,2414,2429,2444,2459,2473,2488,2503,2518,2533,2548,2563,2578,2593,2608,2622,2637,2652,2667,2682,2697,2712,2727,2742,2757,2771,2786,2801,2816,2831,2846,2861,2876,2891,2906,2920,2935,2950,2965,2979],"values":{"68":"68 cm ","30":"30 cm ","121":"121 cm ","178":"178 cm ","277":"277 cm ","279":"279 cm "}}},{"sku":"L-001","cartSku":"L__unas__001","name":"C kerítésléc, kétoldalas, Antracit matt RAL7016","url":"https://lemezinez.hu/spd/L-001/C-keriteslec-ketoldalas-Antracit-matt-RAL7016","price":1490,"family":"slat_c","colour":"antracit_matt","variantName":"Hosszúság méret (30cm-300cm)","length":{"min":30,"max":300,"deltas":[-1043,-1028,-1013,-998,-983,-969,-954,-939,-924,-909,-894,-879,-864,-849,-834,-820,-805,-790,-775,-760,-745,-730,-715,-700,-685,-671,-656,-641,-626,-611,-596,-581,-566,-551,-536,-522,-507,-492,-477,-462,-447,-432,-417,-402,-387,-373,-358,-343,-328,-313,-298,-283,-268,-253,-238,-224,-194,-194,-179,-164,-149,-134,-119,-104,-89,-75,-59,-48,-30,-15,0,15,30,45,60,75,89,104,119,134,149,164,179,194,209,224,238,253,268,283,298,313,328,343,358,373,387,402,417,432,447,462,477,492,507,522,536,551,566,581,596,611,626,641,656,671,685,700,715,730,745,760,775,790,805,820,834,849,864,879,894,909,924,939,954,969,983,998,1013,1028,1043,1058,1073,1088,1103,1118,1132,1147,1162,1177,1192,1207,1222,1237,1252,1267,1281,1296,1311,1326,1341,1356,1371,1386,1401,1416,1430,1445,1460,1475,1490,1505,1520,1535,1550,1565,1579,1594,1609,1624,1639,1654,1669,1684,1699,1714,1728,1743,1758,1773,1788,1803,1818,1833,1848,1863,1877,1892,1907,1922,1937,1952,1967,1982,1997,2012,2026,2041,2056,2071,2086,2101,2116,2131,2146,2161,2175,2190,2205,2220,2235,2250,2265,2280,2295,2310,2324,2339,2354,2369,2384,2399,2414,2429,2444,2459,2473,2488,2503,2518,2533,2548,2563,2578,2593,2608,2622,2637,2652,2667,2682,2697,2712,2727,2742,2757,2771,2786,2801,2816,2831,2846,2861,2876,2891,2906,2920,2935,2950,2965,2980],"values":{"68":"68 cm ","30":"30 cm ","121":"121 cm ","178":"178 cm ","277":"277 cm ","279":"279 cm "}}},{"sku":"L-003","cartSku":"L__unas__003","name":"C kerítésléc, kétoldalas, Aranytölgy 3D","url":"https://lemezinez.hu/spd/L-003/C-keriteslec-ketoldalas-Aranytolgy-3D","price":1490,"family":"slat_c","colour":"aranytolgy","variantName":"Hosszúság méret (30cm-300cm)","length":{"min":30,"max":300,"deltas":[-1043,-1028,-1013,-998,-983,-969,-954,-939,-924,-909,-894,-879,-864,-849,-834,-820,-805,-790,-775,-760,-745,-730,-715,-700,-685,-671,-656,-641,-626,-611,-596,-581,-566,-551,-536,-522,-507,-492,-477,-462,-447,-432,-417,-402,-387,-373,-358,-343,-328,-313,-298,-283,-268,-253,-238,-224,-194,-194,-179,-164,-149,-134,-119,-104,-89,-75,-59,-48,-30,-15,0,15,30,45,60,75,89,104,119,134,149,164,179,194,209,224,238,253,268,283,298,313,328,343,358,373,387,402,417,432,447,462,477,492,507,522,536,551,566,581,596,611,626,641,656,671,685,700,715,730,745,760,775,790,805,820,834,849,864,879,894,909,924,939,954,969,983,998,1013,1028,1043,1058,1073,1088,1103,1118,1132,1147,1162,1177,1192,1207,1222,1237,1252,1267,1281,1296,1311,1326,1341,1356,1371,1386,1401,1416,1430,1445,1460,1475,1490,1505,1520,1535,1550,1565,1579,1594,1609,1624,1639,1654,1669,1684,1699,1714,1728,1743,1758,1773,1788,1803,1818,1833,1848,1863,1877,1892,1907,1922,1937,1952,1967,1982,1997,2012,2026,2041,2056,2071,2086,2101,2116,2131,2146,2161,2175,2190,2205,2220,2235,2250,2265,2280,2295,2310,2324,2339,2354,2369,2384,2399,2414,2429,2444,2459,2473,2488,2503,2518,2533,2548,2563,2578,2593,2608,2622,2637,2652,2667,2682,2697,2712,2727,2742,2757,2771,2786,2801,2816,2831,2846,2861,2876,2891,2906,2920,2935,2950,2965,2981],"values":{"68":"68 cm ","30":"30 cm ","121":"121 cm ","178":"178 cm ","277":"277 cm ","279":"279 cm "}}},{"sku":"L-009","cartSku":"L__unas__009","name":"Íves kerítésléc, kétoldalas, Antracit fényes","url":"https://lemezinez.hu/spd/L-009/Ives-keriteslec-ketoldalas-Antracit-fenyes","price":1150,"family":"slat_ives","colour":"antracit_fenyes","variantName":"Hosszúság méret (30cm-300cm)","length":{"min":30,"max":300,"deltas":[-805,-794,-782,-771,-759,-748,-736,-725,-713,-702,-690,-679,-667,-656,-644,-633,-621,-610,-598,-587,-575,-564,-552,-541,-529,-518,-506,-495,-483,-472,-460,-449,-437,-426,-414,-403,-391,-380,-368,-357,-345,-334,-322,-311,-299,-288,-276,-265,-253,-242,-230,-219,-207,-196,-184,-173,-161,-150,-138,-127,-115,-104,-92,-81,-69,-58,-46,-35,-23,-12,0,12,23,35,46,58,69,81,92,104,115,127,138,150,161,173,184,196,207,219,230,242,253,265,276,288,299,311,322,334,345,357,368,380,391,403,414,426,437,449,460,472,483,495,506,518,529,541,552,564,575,587,598,610,621,633,644,656,667,679,690,702,713,725,736,748,759,771,782,794,805,817,828,840,851,863,874,886,897,909,920,932,943,955,966,978,989,1001,1012,1024,1035,1047,1058,1070,1081,1093,1104,1116,1127,1139,1150,1162,1173,1185,1196,1208,1219,1231,1242,1254,1265,1277,1288,1300,1311,1323,1334,1346,1357,1369,1380,1392,1403,1415,1426,1438,1449,1461,1472,1484,1495,1507,1518,1530,1541,1553,1564,1576,1587,1599,1610,1622,1633,1645,1656,1668,1679,1691,1702,1714,1725,1737,1748,1760,1771,1783,1794,1806,1817,1829,1840,1852,1863,1875,1886,1898,1909,1921,1932,1944,1955,1967,1978,1990,2001,2013,2024,2036,2047,2059,2070,2082,2093,2105,2116,2128,2139,2151,2162,2174,2185,2197,2208,2220,2231,2243,2254,2266,2277,2289,2300],"values":{"68":"68 cm ","30":"30 cm ","121":"121 cm ","178":"178 cm ","277":"277 cm ","279":"279 cm "}}},{"sku":"L-008","cartSku":"L__unas__008","name":"Íves kerítésléc, kétoldalas, Antracit matt","url":"https://lemezinez.hu/spd/L-008/Ives-keriteslec-ketoldalas-Antracit-matt","price":1150,"family":"slat_ives","colour":"antracit_matt","variantName":"Hosszúság méret (30cm-300cm)","length":{"min":30,"max":300,"deltas":[-805,-794,-782,-771,-759,-748,-736,-725,-713,-702,-690,-679,-667,-656,-644,-633,-621,-610,-598,-587,-575,-564,-552,-541,-529,-518,-506,-495,-483,-472,-460,-449,-437,-426,-414,-403,-391,-380,-368,-357,-345,-334,-322,-311,-299,-288,-276,-265,-253,-242,-230,-219,-207,-196,-184,-173,-161,-150,-138,-127,-115,-104,-92,-81,-69,-58,-46,-35,-23,-12,0,12,23,35,46,58,69,81,92,104,115,127,138,150,161,173,184,196,207,219,230,242,253,265,276,288,299,311,322,334,345,357,368,380,391,403,414,426,437,449,460,472,483,495,506,518,529,541,552,564,575,587,598,610,621,633,644,656,667,679,690,702,713,725,736,748,759,771,782,794,805,817,828,840,851,863,874,886,897,909,920,932,943,955,966,978,989,1001,1012,1024,1035,1047,1058,1070,1081,1093,1104,1116,1127,1139,1150,1162,1173,1185,1196,1208,1219,1231,1242,1254,1265,1277,1288,1300,1311,1323,1334,1346,1357,1369,1380,1392,1403,1415,1426,1438,1449,1461,1472,1484,1495,1507,1518,1530,1541,1553,1564,1576,1587,1599,1610,1622,1633,1645,1656,1668,1679,1691,1702,1714,1725,1737,1748,1760,1771,1783,1794,1806,1817,1829,1840,1852,1863,1875,1886,1898,1909,1921,1932,1944,1955,1967,1978,1990,2001,2013,2024,2036,2047,2059,2070,2082,2093,2105,2116,2128,2139,2151,2162,2174,2185,2197,2208,2220,2231,2243,2254,2266,2277,2289,2300],"values":{"68":"68 cm ","30":"30 cm ","121":"121 cm ","178":"178 cm ","277":"277 cm ","279":"279 cm "}}},{"sku":"L-010","cartSku":"L__unas__010","name":"Íves kerítésléc, kétoldalas, Aranytölgy 3D","url":"https://lemezinez.hu/spd/L-010/Ives-keriteslec-ketoldalas-Aranytolgy-3D","price":1150,"family":"slat_ives","colour":"aranytolgy","variantName":"Hosszúság méret (30cm-300cm)","length":{"min":30,"max":300,"deltas":[-805,-794,-782,-771,-759,-748,-736,-725,-713,-702,-690,-679,-667,-656,-644,-633,-621,-610,-598,-587,-575,-564,-552,-541,-529,-518,-506,-495,-483,-472,-460,-449,-437,-426,-414,-403,-391,-380,-368,-357,-345,-334,-322,-311,-299,-288,-276,-265,-253,-242,-230,-219,-207,-196,-184,-173,-161,-150,-138,-127,-115,-104,-92,-81,-69,-58,-46,-35,-23,-12,0,12,23,35,46,58,69,81,92,104,115,127,138,150,161,173,184,196,207,219,230,242,253,265,276,288,299,311,322,334,345,357,368,380,391,403,414,426,437,449,460,472,483,495,506,518,529,541,552,564,575,587,598,610,621,633,644,656,667,679,690,702,713,725,736,748,759,771,782,794,805,817,828,840,851,863,874,886,897,909,920,932,943,955,966,978,989,1001,1012,1024,1035,1047,1058,1070,1081,1093,1104,1116,1127,1139,1150,1162,1173,1185,1196,1208,1219,1231,1242,1254,1265,1277,1288,1300,1311,1323,1334,1346,1357,1369,1380,1392,1403,1415,1426,1438,1449,1461,1472,1484,1495,1507,1518,1530,1541,1553,1564,1576,1587,1599,1610,1622,1633,1645,1656,1668,1679,1691,1702,1714,1725,1737,1748,1760,1771,1783,1794,1806,1817,1829,1840,1852,1863,1875,1886,1898,1909,1921,1932,1944,1955,1967,1978,1990,2001,2013,2024,2036,2047,2059,2070,2082,2093,2105,2116,2128,2139,2151,2162,2174,2185,2197,2208,2220,2231,2243,2254,2266,2277,2289,2300],"values":{"68":"68 cm ","30":"30 cm ","121":"121 cm ","178":"178 cm ","277":"277 cm ","279":"279 cm "}}},{"sku":"L-007","cartSku":"L__unas__007","name":"Íves kerítésléc, kétoldalas, Dió","url":"https://lemezinez.hu/spd/L-007/Ives-keriteslec-ketoldalas-Dio","price":1150,"family":"slat_ives","colour":"dio","variantName":"Hosszúság méret (30cm-300cm)","length":{"min":30,"max":300,"deltas":[-805,-794,-782,-771,-759,-748,-736,-725,-713,-702,-690,-679,-667,-656,-644,-633,-621,-610,-598,-587,-575,-564,-552,-541,-529,-518,-506,-495,-483,-472,-460,-449,-437,-426,-414,-403,-391,-380,-368,-357,-345,-334,-322,-311,-299,-288,-276,-265,-253,-242,-230,-219,-207,-196,-184,-173,-161,-150,-138,-127,-115,-104,-92,-81,-69,-58,-46,-35,-23,-12,0,12,23,35,46,58,69,81,92,104,115,127,138,150,161,173,184,196,207,219,230,242,253,265,276,288,299,311,322,334,345,357,368,380,391,403,414,426,437,449,460,472,483,495,506,518,529,541,552,564,575,587,598,610,621,633,644,656,667,679,690,702,713,725,736,748,759,771,782,794,805,817,828,840,851,863,874,886,897,909,920,932,943,955,966,978,989,1001,1012,1024,1035,1047,1058,1070,1081,1093,1104,1116,1127,1139,1150,1162,1173,1185,1196,1208,1219,1231,1242,1254,1265,1277,1288,1300,1311,1323,1334,1346,1357,1369,1380,1392,1403,1415,1426,1438,1449,1461,1472,1484,1495,1507,1518,1530,1541,1553,1564,1576,1587,1599,1610,1622,1633,1645,1656,1668,1679,1691,1702,1714,1725,1737,1748,1760,1771,1783,1794,1806,1817,1829,1840,1852,1863,1875,1886,1898,1909,1921,1932,1944,1955,1967,1978,1990,2001,2013,2024,2036,2047,2059,2070,2082,2093,2105,2116,2128,2139,2151,2162,2174,2185,2197,2208,2220,2231,2243,2254,2266,2277,2289,2300],"values":{"68":"68 cm ","30":"30 cm ","121":"121 cm ","178":"178 cm ","277":"277 cm ","279":"279 cm "}}},{"sku":"L-111","cartSku":"L__unas__111","name":"Íves kerítésléc, kétoldalas, Fehér tölgy","url":"https://lemezinez.hu/Ives-keriteslec-ketoldalas-Feher-tolgy","price":1150,"family":"slat_ives","colour":"feher_tolgy"},{"sku":"L-013","cartSku":"L__unas__013","name":"Rusztikus kerítésléc, kétoldalas, Antracit Matt","url":"https://lemezinez.hu/spd/L-013/Rusztikus-keriteslec-ketoldalas-Antracit-Matt","price":1150,"family":"slat_rusztikus","colour":"antracit_matt","variantName":"Hosszúság méret (30cm-300cm)","length":{"min":30,"max":300,"deltas":[-1043,-1028,-1013,-998,-983,-969,-954,-939,-924,-909,-894,-879,-864,-849,-834,-820,-805,-790,-775,-760,-745,-730,-715,-700,-685,-671,-656,-641,-626,-611,-596,-581,-566,-551,-536,-522,-507,-492,-477,-462,-447,-432,-417,-402,-387,-373,-358,-343,-328,-313,-298,-283,-268,-253,-238,-224,-194,-194,-179,-164,-149,-134,-119,-104,-89,-75,-59,-48,-30,-15,0,15,30,45,60,75,89,104,119,134,149,164,179,194,209,224,238,253,268,283,298,313,328,343,358,373,387,402,417,432,447,462,477,492,507,522,536,551,566,581,596,611,626,641,656,671,685,700,715,730,745,760,775,790,805,820,834,849,864,879,894,909,924,939,954,969,983,998,1013,1028,1043,1058,1073,1088,1103,1118,1132,1147,1162,1177,1192,1207,1222,1237,1252,1267,1281,1296,1311,1326,1341,1356,1371,1386,1401,1416,1430,1445,1460,1475,1490,1505,1520,1535,1550,1565,1579,1594,1609,1624,1639,1654,1669,1684,1699,1714,1728,1743,1758,1773,1788,1803,1818,1833,1848,1863,1877,1892,1907,1922,1937,1952,1967,1982,1997,2012,2026,2041,2056,2071,2086,2101,2116,2131,2146,2161,2175,2190,2205,2220,2235,2250,2265,2280,2295,2310,2324,2339,2354,2369,2384,2399,2414,2429,2444,2459,2473,2488,2503,2518,2533,2548,2563,2578,2593,2608,2622,2637,2652,2667,2682,2697,2712,2727,2742,2757,2771,2786,2801,2816,2831,2846,2861,2876,2891,2906,2920,2935,2950,2965,2984],"values":{"68":"68 cm ","30":"30 cm ","121":"121 cm ","178":"178 cm ","277":"277 cm ","279":"279 cm "}}},{"sku":"L-012","cartSku":"L__unas__012","name":"Rusztikus kerítésléc, kétoldalas, Aranytölgy 3D","url":"https://lemezinez.hu/spd/L-012/Rusztikus-keriteslec-ketoldalas-Aranytolgy-3D","price":1150,"family":"slat_rusztikus","colour":"aranytolgy","variantName":"Hosszúság méret (30cm-300cm)","length":{"min":30,"max":300,"deltas":[-1043,-1028,-1013,-998,-983,-969,-954,-939,-924,-909,-894,-879,-864,-849,-834,-820,-805,-790,-775,-760,-745,-730,-715,-700,-685,-671,-656,-641,-626,-611,-596,-581,-566,-551,-536,-522,-507,-492,-477,-462,-447,-432,-417,-402,-387,-373,-358,-343,-328,-313,-298,-283,-268,-253,-238,-224,-194,-194,-179,-164,-149,-134,-119,-104,-89,-75,-59,-48,-30,-15,0,15,30,45,60,75,89,104,119,134,149,164,179,194,209,224,238,253,268,283,298,313,328,343,358,373,387,402,417,432,447,462,477,492,507,522,536,551,566,581,596,611,626,641,656,671,685,700,715,730,745,760,775,790,805,820,834,849,864,879,894,909,924,939,954,969,983,998,1013,1028,1043,1058,1073,1088,1103,1118,1132,1147,1162,1177,1192,1207,1222,1237,1252,1267,1281,1296,1311,1326,1341,1356,1371,1386,1401,1416,1430,1445,1460,1475,1490,1505,1520,1535,1550,1565,1579,1594,1609,1624,1639,1654,1669,1684,1699,1714,1728,1743,1758,1773,1788,1803,1818,1833,1848,1863,1877,1892,1907,1922,1937,1952,1967,1982,1997,2012,2026,2041,2056,2071,2086,2101,2116,2131,2146,2161,2175,2190,2205,2220,2235,2250,2265,2280,2295,2310,2324,2339,2354,2369,2384,2399,2414,2429,2444,2459,2473,2488,2503,2518,2533,2548,2563,2578,2593,2608,2622,2637,2652,2667,2682,2697,2712,2727,2742,2757,2771,2786,2801,2816,2831,2846,2861,2876,2891,2906,2920,2935,2950,2965,2985],"values":{"68":"68 cm ","30":"30 cm ","121":"121 cm ","178":"178 cm ","277":"277 cm ","279":"279 cm "}}},{"sku":"L-011","cartSku":"L__unas__011","name":"Rusztikus kerítésléc, kétoldalas, Dió","url":"https://lemezinez.hu/spd/L-011/Rusztikus-keriteslec-ketoldalas-Dio","price":1150,"family":"slat_rusztikus","colour":"dio","variantName":"Hosszúság méret (30cm-300cm)","length":{"min":30,"max":300,"deltas":[-1043,-1028,-1013,-998,-983,-969,-954,-939,-924,-909,-894,-879,-864,-849,-834,-820,-805,-790,-775,-760,-745,-730,-715,-700,-685,-671,-656,-641,-626,-611,-596,-581,-566,-551,-536,-522,-507,-492,-477,-462,-447,-432,-417,-402,-387,-373,-358,-343,-328,-313,-298,-283,-268,-253,-238,-224,-194,-194,-179,-164,-149,-134,-119,-104,-89,-75,-59,-48,-30,-15,0,15,30,45,60,75,89,104,119,134,149,164,179,194,209,224,238,253,268,283,298,313,328,343,358,373,387,402,417,432,447,462,477,492,507,522,536,551,566,581,596,611,626,641,656,671,685,700,715,730,745,760,775,790,805,820,834,849,864,879,894,909,924,939,954,969,983,998,1013,1028,1043,1058,1073,1088,1103,1118,1132,1147,1162,1177,1192,1207,1222,1237,1252,1267,1281,1296,1311,1326,1341,1356,1371,1386,1401,1416,1430,1445,1460,1475,1490,1505,1520,1535,1550,1565,1579,1594,1609,1624,1639,1654,1669,1684,1699,1714,1728,1743,1758,1773,1788,1803,1818,1833,1848,1863,1877,1892,1907,1922,1937,1952,1967,1982,1997,2012,2026,2041,2056,2071,2086,2101,2116,2131,2146,2161,2175,2190,2205,2220,2235,2250,2265,2280,2295,2310,2324,2339,2354,2369,2384,2399,2414,2429,2444,2459,2473,2488,2503,2518,2533,2548,2563,2578,2593,2608,2622,2637,2652,2667,2682,2697,2712,2727,2742,2757,2771,2786,2801,2816,2831,2846,2861,2876,2891,2906,2920,2935,2950,2965,2986],"values":{"68":"68 cm ","30":"30 cm ","121":"121 cm ","178":"178 cm ","277":"277 cm ","279":"279 cm "}}},{"sku":"L-20","cartSku":"L__unas__20","name":"Rusztikus kerítésléc, kétoldalas, Fehér Tölgy","url":"https://lemezinez.hu/Rusztikus-keriteslec-ketoldalas-Feher-Tolgy","price":1150,"family":"slat_rusztikus","colour":"feher_tolgy"}]};
/* PRODUCTS:END */

  // Installation rules. Rule numbers refer to the owner's checklist.
  const RULES = {
    slatTypes: {
      // widthCm: visible width of one slat. clips/caps: accessory families.
      c:         { label: "Modern C léc",    family: "slat_c",         widthCm: 9.3, clip: "clip_c",         cap: "cap_c" },
      ives:      { label: "Íves léc",        family: "slat_ives",      widthCm: 12,  clip: null,             cap: null, edges: true },
      rusztikus: { label: "Rusztikus léc",   family: "slat_rusztikus", widthCm: 7.5, clip: "clip_rusztikus", cap: "cap_rusztikus" },
      budo:      { label: "Budó léc",        family: "slat_budo",      widthCm: 8.5, clip: null,             cap: null },
    },
    defaultGapCm: 2,                 // rule 5; the owner: anything from 0 to 5+ cm
    // Gap presets (owner: "0-1 cm, 2-4 cm, 5 cm felett"). gapCm is what picking
    // the preset sets; a preset is lit from its min up to the next preset's min.
    gapPresets: [
      { label: "Zárt (0–1 cm)", gapCm: 0, min: 0 },
      { label: "2–4 cm", gapCm: 2, min: 2 },
      { label: "5 cm-től", gapCm: 5, min: 5 },
    ],
    maxGapCm: 30,
    maxPostSpacingCm: 200,           // rule 3: the default; the owner allows up to 300 (the longest slat)
    railsUpToHeightCm: { 150: 2 },   // rule 6: up to 150 cm 2 rails ...
    railsAbove: 3,                   // ... above that 3
    horizontal: {
      // Owner: a 150 cm slat needs 2 clips, a 200 cm one with support behind +1.
      // So a slat is fixed at both ends, plus once on every middle support.
      endPointsPerSlat: 2,
      maxMiddleSupports: 4,
      fixingsPerClip: 1,             // rule 8
      fixingsPerPointNoClip: 1,      // rule 9: one screw per fixing point
      // Owner: above 200 cm a slat fixed only at its ends needs support behind.
      maxUnsupportedSlatCm: 200,
      edgeCaps: false,               // rule 16
    },
    vertical: {
      fixingsPerSlatPerRail: 1,      // rule 10
      clipsPerSlatPerRail: 0,        // rule 11 (unconfirmed)
      edgeCaps: true,                // rule 15; top/bottom are customer options
    },
    // Owner: the L- and Z-profile work like the U-profile, so the customer
    // optionally picks one of the three. The quantity suggestion is rule 17:
    // per started pieceLengthCm of height, on the two end posts.
    profiles: { u: "profile_u", l: "profile_l", z: "profile_z" },
    profileLabels: { u: "U-profil", l: "L-profil", z: "Z-profil" },
    profilePieceLengthCm: 200,
    maxProfileQty: 500,
    // Advanced-setting defaults, used by calculate() and the form alike.
    // caps: end caps (Íves upright: edge guards) per slat, the customer's
    // choice of 0, 1 or 2 (owner; rule 14's 2 is the default). For Íves, 1 is
    // the top edge guard only.
    defaults: { middleSupports: 0, fixingMode: "clip", caps: 2, profile: "none" },
    maxCapsPerSlat: 2,
    sparePercent: 5,                 // rule 13, confirmed
    // rules 20-22, confirmed: slat colour -> fastener colour
    fastenerColour: {
      antracit_matt: "antracit_matt", antracit_fenyes: "antracit_matt", antracit_faminta: "antracit_matt",
      dio: "csokibarna", aranytolgy: "barna",
    },
    // rule 23, confirmed: slat colour -> profile colour when the exact one does not exist
    profileColour: { antracit_faminta: "antracit_matt" },
    // Íves edge caps are one product with a colour option (exact UNAS values).
    edgeCapVariant: {
      antracit_matt: "Antracit Szürke (Antracit léchez)",
      antracit_fenyes: "Antracit Szürke (Antracit léchez)",
      dio: "Csokibarna ( Dió léchez)",
      aranytolgy: "Barna ( Világos Dió léchez)",
    },
  };

  const COLOUR_LABELS = {
    antracit_matt: "Antracit matt", antracit_fenyes: "Antracit fényes", antracit_faminta: "Antracit faminta",
    dio: "Dió", aranytolgy: "Aranytölgy 3D", feher_tolgy: "Fehér tölgy",
  };

  const SHOP_HOSTS = ["lemezinez.hu", "www.lemezinez.hu"];
  const CART_ENDPOINT = "/shop_ajax/ajax_cart.php";
  const CART_PAGE = "/shop_cart.php";
  const QUOTE_PAGE = "/spg/380693/Ajanlatkeres";
  const PHONE = "+36 70 367 9704";

  // ---------------------------------------------------------------------------
  // Catalogue helpers

  function findProduct(catalogue, family, colour) {
    return catalogue.products.find(function (p) {
      return p.family === family && (colour === undefined || p.colour === colour);
    }) || null;
  }

  // Colours a slat type can be calculated in: only products with a length selector.
  function coloursFor(catalogue, typeKey) {
    const family = RULES.slatTypes[typeKey].family;
    return catalogue.products
      .filter(function (p) { return p.family === family && p.length; })
      .map(function (p) { return p.colour; });
  }

  function priceAtLength(product, cm) {
    const len = product.length;
    if (!len || cm < len.min || cm > len.max) return null;
    const delta = len.deltas[cm - len.min];
    return delta === null || delta === undefined ? null : product.price + delta;
  }

  function lengthValue(product, cm) {
    const odd = product.length && product.length.values;
    return (odd && odd[String(cm)]) || cm + " cm";
  }

  function withSpare(n, rules) {
    // Integer arithmetic: n * 1.1 can land a hair above a whole number and ceil
    // would then add a piece. n * 110 / 100 stays exact.
    return n <= 0 ? 0 : Math.ceil(n * (100 + rules.sparePercent) / 100);
  }

  // { 150: 2 } with above 3: up to 150 -> 2, otherwise 3.
  function stepLookup(value, upTo, above) {
    const limits = Object.keys(upTo).map(Number).sort(function (a, b) { return a - b; });
    for (let i = 0; i < limits.length; i++) {
      if (value <= limits[i]) return upTo[limits[i]];
    }
    return above;
  }

  function railsFor(heightCm, rules) {
    return stepLookup(heightCm, rules.railsUpToHeightCm, rules.railsAbove);
  }

  // Suggested profile pieces: two end posts, per started piece length of height.
  function suggestedProfileQty(heightCm, rules) {
    rules = rules || RULES;
    const h = Math.round(Number(heightCm));
    return h > 0 ? 2 * Math.ceil(h / rules.profilePieceLengthCm) : 0;
  }

  // ---------------------------------------------------------------------------
  // The calculation. Pure: no DOM, no network.
  //
  // input: { layout: "horizontal"|"vertical", type: "c"|"ives"|"rusztikus"|"budo",
  //          colour, lengthM, heightCm, gapCm, maxPostSpacingCm,
  //          fastener: "screw"|"rivet",
  //          advanced settings, all optional (defaults in rules.defaults):
  //          middleSupports: 0..maxMiddleSupports      (horizontal: supports behind a slat)
  //          fixingMode: "clip" | "direct"             (horizontal clip types; direct = no clips)
  //          caps: 0..maxCapsPerSlat                   (end caps / Íves upright edge guards per slat)
  //          profile: "none" | "u" | "l" | "z", profileQty: whole number }
  // Whole numbers may come as strings, as form fields send them.
  // returns { ok, errors[], warnings[], lines[], info{}, total }

  function calculate(input, catalogue, rules) {
    catalogue = catalogue || CATALOGUE;
    rules = rules || RULES;
    const errors = [];
    const warnings = [];
    const type = rules.slatTypes[input.type];
    if (!type) errors.push("Ismeretlen léctípus.");
    const slat = type ? findProduct(catalogue, type.family, input.colour) : null;
    if (type && !slat) errors.push("Ez a szín ennél a léctípusnál nem rendelhető.");
    if (slat && !slat.length) errors.push("Ennél a terméknél a webshopban nem választható hossz.");

    const lengthCm = Math.round(Number(input.lengthM) * 100);
    const heightCm = Math.round(Number(input.heightCm));
    // An empty field is not 0 cm: Number("") would quietly mean a closed fence.
    const gapCm = input.gapCm === "" || input.gapCm === null ? NaN : Number(input.gapCm);
    if (!(lengthCm >= 30)) errors.push("Adja meg a kerítés hosszát (legalább 0,3 m).");
    if (lengthCm > 50000) errors.push("500 m fölötti kerítésnél kérjen egyedi ajánlatot.");
    if (!(heightCm >= 30)) errors.push("Adja meg a kerítés magasságát (legalább 30 cm).");
    if (!(gapCm >= 0) || gapCm > rules.maxGapCm) errors.push("A hézag 0 és " + rules.maxGapCm + " cm között lehet.");

    const vertical = input.layout === "vertical";
    const setting = function (key) {
      return input[key] === undefined || input[key] === null || input[key] === "" ? rules.defaults[key] : input[key];
    };
    const middleSupports = Number(setting("middleSupports"));
    if (!vertical && !(Number.isInteger(middleSupports) && middleSupports >= 0 && middleSupports <= rules.horizontal.maxMiddleSupports)) {
      errors.push("A köztes alátámasztások száma 0 és " + rules.horizontal.maxMiddleSupports + " között lehet.");
    }
    const fixingMode = setting("fixingMode");
    if (fixingMode !== "clip" && fixingMode !== "direct") errors.push("Ismeretlen rögzítési mód.");
    // A number or a digit string, as the form sends it. Number() alone would
    // turn true into 1 and false or " " into 0.
    const rawCaps = setting("caps");
    const caps = typeof rawCaps === "number" || (typeof rawCaps === "string" && /^[0-9]+$/.test(rawCaps)) ? Number(rawCaps) : NaN;
    if (!(Number.isInteger(caps) && caps >= 0 && caps <= rules.maxCapsPerSlat)) errors.push("Érvénytelen végzáró-beállítás.");
    const profileKey = setting("profile") !== "none" ? setting("profile") : null;
    if (profileKey && !Object.prototype.hasOwnProperty.call(rules.profiles, profileKey)) errors.push("Ismeretlen profiltípus.");
    const profileQty = Number(input.profileQty);
    if (profileKey && !(Number.isInteger(profileQty) && profileQty >= 1 && profileQty <= rules.maxProfileQty)) {
      errors.push("A profilok száma 1 és " + rules.maxProfileQty + " darab között lehet.");
    }
    if (errors.length) return { ok: false, errors: errors, warnings: warnings, lines: [], info: {}, total: 0 };

    const minLen = slat.length.min;
    const maxLen = slat.length.max;
    const pitch = type.widthCm + gapCm;
    const info = {};
    let slatLengthCm;
    let slatCount;
    let attachPoints; // places where one slat is fixed (post ends or rails)

    if (vertical) {
      if (heightCm > maxLen) {
        errors.push("Függőleges szerelésnél a magasság legfeljebb " + maxLen + " cm lehet.");
        return { ok: false, errors: errors, warnings: warnings, lines: [], info: {}, total: 0 };
      }
      slatLengthCm = heightCm;
      slatCount = Math.ceil((lengthCm + gapCm) / pitch);
      const rails = railsFor(heightCm, rules);
      attachPoints = rails;
      info.rails = rails;
      info.railLengthM = lengthCm / 100;
      info.coveredLengthCm = Math.round((slatCount * type.widthCm + (slatCount - 1) * gapCm) * 10) / 10;
    } else {
      const maxSpacing = Math.min(Number(input.maxPostSpacingCm) || rules.maxPostSpacingCm, maxLen);
      const fields = Math.ceil(lengthCm / maxSpacing);
      const spacing = lengthCm / fields;
      slatLengthCm = Math.round(spacing);
      if (slatLengthCm < minLen) {
        errors.push("Túl rövid mező: a léc legalább " + minLen + " cm hosszú lehet.");
        return { ok: false, errors: errors, warnings: warnings, lines: [], info: {}, total: 0 };
      }
      const rows = Math.floor((heightCm + gapCm) / pitch);
      if (rows < 1) {
        errors.push("A megadott magasságba egy léc sem fér el.");
        return { ok: false, errors: errors, warnings: warnings, lines: [], info: {}, total: 0 };
      }
      slatCount = fields * rows;
      attachPoints = rules.horizontal.endPointsPerSlat + middleSupports;
      info.supportPoints = attachPoints;
      info.middleSupports = middleSupports;
      info.fields = fields;
      info.posts = fields + 1;
      info.postSpacingCm = Math.round(spacing * 10) / 10;
      info.rows = rows;
      info.actualHeightCm = Math.round((rows * type.widthCm + (rows - 1) * gapCm) * 10) / 10;
      if (slatLengthCm > rules.horizontal.maxUnsupportedSlatCm && middleSupports === 0) {
        warnings.push("A lécek " + slatLengthCm + " cm hosszúak. " + rules.horizontal.maxUnsupportedSlatCm +
          " cm fölött a léc mögé köztes alátámasztás kell. Kérjük, adja meg a „Köztes alátámasztás a léc mögött” mezőben.");
      }
      if (heightCm - info.actualHeightCm >= pitch / 2) {
        warnings.push("A lécek " + fmtNum(info.actualHeightCm) + " cm magasságot adnak ki. A hézag kis módosításával közelebb kerülhet a kívánt " + heightCm + " cm-hez.");
      }
    }
    info.slatLengthCm = slatLengthCm;
    info.slatCount = slatCount;

    const lines = [];
    function add(product, qty, opts) {
      opts = opts || {};
      if (!product || qty <= 0) return;
      const unit = opts.lengthCm ? priceAtLength(product, opts.lengthCm) : product.price;
      if (unit === null) {
        errors.push("Nincs ár a(z) " + opts.lengthCm + " cm-es hosszhoz: " + product.name);
        return;
      }
      lines.push({
        product: product, qty: qty, unitPrice: unit, total: unit * qty,
        lengthCm: opts.lengthCm || null,
        variantName: opts.variantName || (opts.lengthCm ? product.variantName : null),
        variantValue: opts.variantValue || (opts.lengthCm ? lengthValue(product, opts.lengthCm) : null),
        role: opts.role,
      });
    }

    add(slat, slatCount, { lengthCm: slatLengthCm, role: "slat" });

    const layoutRules = vertical ? rules.vertical : rules.horizontal;
    // Owner: some customers skip the clips and screw the slats on directly.
    const useClips = Boolean(type.clip) && fixingMode !== "direct";
    let clips = 0;
    let fixings;
    if (vertical) {
      if (useClips) clips = slatCount * attachPoints * layoutRules.clipsPerSlatPerRail;
      fixings = slatCount * attachPoints * layoutRules.fixingsPerSlatPerRail;
    } else if (useClips) {
      clips = slatCount * attachPoints;
      fixings = clips * layoutRules.fixingsPerClip;
    } else {
      fixings = slatCount * attachPoints * layoutRules.fixingsPerPointNoClip;
    }
    if (clips) add(findProduct(catalogue, type.clip), withSpare(clips, rules), { role: "clip" });

    const fastenerColour = rules.fastenerColour[input.colour];
    const fastenerFamily = input.fastener === "rivet" ? "rivet" : "screw";
    const fastener = fastenerColour ? findProduct(catalogue, fastenerFamily, fastenerColour) : null;
    if (fastener) add(fastener, withSpare(fixings, rules), { role: "fixing" });
    else warnings.push("Ehhez a színhez nincs színazonos " + (fastenerFamily === "rivet" ? "popszegecs" : "csavar") + ", ezért a listában nem szerepel.");

    if (type.cap && caps) {
      add(findProduct(catalogue, type.cap), withSpare(slatCount * caps, rules), { role: "cap" });
    }
    if (type.edges && layoutRules.edgeCaps) {
      const variant = rules.edgeCapVariant[input.colour];
      [["edge_top_ives", caps >= 1], ["edge_bottom_ives", caps >= 2]].forEach(function (pair) {
        const p = pair[1] ? findProduct(catalogue, pair[0]) : null;
        if (p && variant) add(p, withSpare(slatCount, rules), { variantName: p.variantName, variantValue: variant, role: "edge" });
      });
    }

    if (profileKey) {
      const profColour = rules.profileColour[input.colour] || input.colour;
      const profile = findProduct(catalogue, rules.profiles[profileKey], profColour);
      if (profile) add(profile, profileQty, { role: "profile" });
      else warnings.push("Ehhez a színhez nincs színazonos " + rules.profileLabels[profileKey] + ", ezért a listában nem szerepel.");
    }

    const total = lines.reduce(function (s, l) { return s + l.total; }, 0);
    return { ok: errors.length === 0, errors: errors, warnings: warnings, lines: lines, info: info, total: total };
  }

  // ---------------------------------------------------------------------------
  // Formatting

  // UNAS strips backslashes when a page is saved, so this file contains none:
  // no escape sequences in regexes or strings. Use NL, WS and character classes.
  const NL = String.fromCharCode(10);
  const WS = "[ " + String.fromCharCode(9, 10, 11, 12, 13, 160, 65279) + "]";

  // Shop option values can carry stray spaces ("Csokibarna ( Dió léchez)").
  // Tidy them for display only: the cart still receives the exact value.
  function tidy(s) {
    return String(s).trim()
      .replace(new RegExp("[(]" + WS + "+", "g"), "(")
      .replace(new RegExp(WS + "+[)]", "g"), ")")
      .replace(new RegExp(WS + "{2,}", "g"), " ");
  }

  function fmtNum(n) {
    return String(n).replace(".", ",");
  }
  function fmtFt(n) {
    return Math.round(n).toString().replace(/([0-9])(?=([0-9]{3})+(?![0-9]))/g, "$1 ") + " Ft";
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function listAsText(result, input) {
    const rows = result.lines.map(function (l) {
      const len = l.lengthCm ? ", " + l.lengthCm + " cm" : "";
      const variant = l.role === "edge" ? ", " + tidy(l.variantValue) : "";
      return l.qty + " db  " + l.product.name + len + variant + "  –  " + fmtFt(l.total);
    });
    const head = "Kerítés: " + fmtNum(input.lengthM) + " m × " + input.heightCm + " cm, " +
      (input.layout === "vertical" ? "függőleges" : "vízszintes") + ", " + RULES.slatTypes[input.type].label +
      ", " + (COLOUR_LABELS[input.colour] || input.colour);
    return [head, settingsLine(result, input), ""].concat(rows, ["", "Összesen: " + fmtFt(result.total)]).join(NL);
  }

  // The advanced settings behind a result, so a pasted list can be checked.
  function settingsLine(result, input) {
    const type = RULES.slatTypes[input.type];
    const parts = ["Hézag: " + fmtNum(input.gapCm) + " cm"];
    const caps = input.caps === undefined || input.caps === null || input.caps === "" ? RULES.defaults.caps : Number(input.caps);
    if (type.cap) parts.push(caps ? "végzáró: lécenként " + caps + " db" : "végzáró nélkül");
    if (input.layout === "vertical") {
      if (type.edges) parts.push(caps ? "élvédő: " + (caps >= 2 ? "felső és alsó" : "felső") : "élvédő nélkül");
    } else {
      parts.push("rögzítési pontok: lécenként " + result.info.supportPoints);
      if (type.clip) parts.push(input.fixingMode === "direct" ? "klipsz nélkül" : "klipsszel");
    }
    const profile = input.profile && input.profile !== "none" ? RULES.profileLabels[input.profile] : null;
    parts.push(profile ? profile + " " + input.profileQty + " db" : "profil nélkül");
    return "Beállítások: " + parts.join(", ");
  }

  // ---------------------------------------------------------------------------
  // Cart

  function isShop() {
    return typeof location !== "undefined" && SHOP_HOSTS.indexOf(location.hostname) !== -1;
  }

  async function addLineToCart(line) {
    const body = new URLSearchParams({
      get_ajax: "1", result_type: "json", lang_master: "hu", action: "add",
      sku: line.product.cartSku, qty: String(line.qty),
    });
    if (line.variantName) {
      body.set("variant_name1", line.variantName);
      body.set("variant_list1", line.variantValue);
    }
    const res = await fetch(CART_ENDPOINT, {
      method: "POST", credentials: "same-origin",
      headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8", "X-Requested-With": "XMLHttpRequest" },
      body: body.toString(),
    });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const json = await res.json();
    // The live shop answers cart_success: true (checked 2026-10-22). "1" is still accepted.
    if (json.cart_success !== true && String(json.cart_success) !== "1") {
      throw new Error(json.error || json.cart_text || "a webshop nem fogadta el a tételt");
    }
    return json;
  }

  // ---------------------------------------------------------------------------
  // Live catalogue
  //
  // On the shop itself the widget reads current data from the product pages,
  // the way scripts/fetch_products.py does. The sitemap lists the pages, a
  // page's web address says which family it holds, and the page gives name,
  // price, cart code and length surcharges. Only the families a calculation
  // needs are fetched. If anything fails, the baked CATALOGUE is used instead.
  // No regex here uses an escape sequence (see NL and WS below).

  const SITEMAP = "/sitemap.xml";

  // Product family and colour by product name, as in fetch_products.py.
  // Order matters: the first match wins.
  const NAME_FAMILIES = [
    ["^C kerítésléc", "slat_c"], ["^Budó léc", "slat_budo"],
    ["^Íves kerítésléc FELSŐ élvédő", "edge_top_ives"], ["^Íves kerítésléc ALSÓ élvédő", "edge_bottom_ives"],
    ["^Íves kerítésléc", "slat_ives"], ["^Rusztikus kerítésléc", "slat_rusztikus"],
    ["^Felfogató klipsz C", "clip_c"], ["^Felfogató klipsz rusztikus", "clip_rusztikus"],
    ["^Végzáró C", "cap_c"], ["^Végzáró Rusztikus", "cap_rusztikus"],
    ["^U-profil", "profile_u"], ["^L-profil", "profile_l"], ["^Z-profil", "profile_z"],
    ["^Fémcsavar", "screw"], ["^Popszegecs", "rivet"],
  ];
  const NAME_COLOURS = [
    ["antracit fényes", "antracit_fenyes"], ["antracit faminta", "antracit_faminta"], ["antracit", "antracit_matt"],
    ["aranytölgy", "aranytolgy"], ["fehér tölgy", "feher_tolgy"], ["csokibarna", "csokibarna"], ["barna", "barna"], ["dió", "dio"],
  ];
  // Web addresses that do not start like the product name.
  const SLUG_FAMILIES = [["klipsz rusztikus", "clip_rusztikus"]];

  // "Íves kerítésléc" and "Ives-keriteslec" both become "ives keriteslec".
  const ACCENTS = new RegExp("[" + String.fromCharCode(0x300) + "-" + String.fromCharCode(0x36f) + "]", "g");
  function plain(s) {
    return String(s).normalize("NFD").replace(ACCENTS, "").toLowerCase().replace(/[-_]+/g, " ").trim();
  }

  function familyForName(name) {
    const hit = NAME_FAMILIES.find(function (r) { return new RegExp(r[0]).test(name); });
    return hit ? hit[1] : null;
  }

  function colourForName(name) {
    const lower = name.toLowerCase();
    const hit = NAME_COLOURS.find(function (r) { return lower.indexOf(r[0]) !== -1; });
    return hit ? hit[1] : null;
  }

  // The family a product page holds, judged from its web address alone.
  function familyForUrl(url) {
    const parts = String(url).split("?")[0].split("/").filter(Boolean);
    // spl/ and sct/ addresses are product lists and categories, not products.
    if (parts.indexOf("spl") !== -1 || parts.indexOf("sct") !== -1) return null;
    const slug = plain(decodeURIComponent(parts.pop() || ""));
    const hit = NAME_FAMILIES.find(function (r) { return slug.indexOf(plain(r[0].slice(1))) === 0; }) ||
      SLUG_FAMILIES.find(function (r) { return slug.indexOf(r[0]) !== -1; });
    return hit ? hit[1] : null;
  }

  const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: String.fromCharCode(160) };
  function decodeEntities(s) {
    return String(s).replace(/&(#x[0-9a-f]+|#[0-9]+|[a-z]+);/gi, function (m, e) {
      if (e[0] === "#") return String.fromCharCode(e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : Number(e.slice(1)));
      return Object.prototype.hasOwnProperty.call(ENTITIES, e.toLowerCase()) ? ENTITIES[e.toLowerCase()] : m;
    });
  }

  // "208 cm (+1 609 Ft)" -> [208, 1609]; "100 cm" -> [100, 0].
  const DELTA = new RegExp("^" + WS + "*([0-9]+)" + WS + "*cm(?:" + WS + "*[(]([+-])" + WS + "*([0-9" + WS.slice(1) + "+)" + WS + "*Ft[)])?");
  const PLAIN_LENGTH = new RegExp("^[0-9]+ cm" + WS + "*$");
  function parseDelta(label) {
    const m = DELTA.exec(label);
    if (!m) return null;
    const delta = m[2] ? Number(m[3].replace(/[^0-9]/g, "")) : 0;
    return [Number(m[1]), m[2] === "-" ? -delta : delta];
  }

  // One product page -> one catalogue product, or null when it is not one.
  function parseProductPage(url, page) {
    let product = null;
    const blocks = new RegExp('<script type="application/ld[+]json">([^]*?)</' + "script>", "g");
    let b;
    while ((b = blocks.exec(page))) {
      try {
        const j = JSON.parse(b[1]);
        if (j && j["@type"] === "Product") product = j;
      } catch (e) { /* not JSON: skip the block */ }
    }
    if (!product || !product.offers) return null;
    const name = decodeEntities(product.name).trim();
    const cart = /cart_add[(]'([^']+)'/.exec(page);
    const item = {
      sku: product.sku || null,
      cartSku: cart ? cart[1] : null,
      name: name,
      url: url,
      price: Math.trunc(Number(product.offers.price)),
      family: familyForName(name) || familyForUrl(url),
      colour: colourForName(name),
    };
    const vname = /id="egyeb_nev1_[^"]*" value="([^"]*)"/.exec(page);
    if (vname) {
      item.variantName = decodeEntities(vname[1]);
      const sel = /<select name="egyeb_list1"[^]*?<[/]select>/.exec(page);
      const options = /<option value="([^"]*)"[^>]*>([^<]*)<[/]option>/g;
      const lengths = {};
      const odd = {};
      const values = [];
      let o;
      while (sel && (o = options.exec(sel[0]))) {
        const value = decodeEntities(o[1]);
        const parsed = parseDelta(decodeEntities(o[2]));
        if (parsed && PLAIN_LENGTH.test(value)) {
          lengths[parsed[0]] = parsed[1];
          // The cart matches the option value exactly, trailing space included.
          if (value !== parsed[0] + " cm") odd[parsed[0]] = value;
        } else if (value) {
          values.push(value);
        }
      }
      const cms = Object.keys(lengths).map(Number);
      if (cms.length) {
        const lo = Math.min.apply(null, cms);
        const hi = Math.max.apply(null, cms);
        const deltas = [];
        for (let cm = lo; cm <= hi; cm++) deltas.push(cm in lengths ? lengths[cm] : null);
        item.length = { min: lo, max: hi, deltas: deltas };
        if (Object.keys(odd).length) item.length.values = odd;
      }
      if (values.length) item.variantValues = values;
    }
    return item;
  }

  // The product families a calculation with these inputs looks up.
  function neededFamilies(input) {
    const type = RULES.slatTypes[input.type];
    const families = [type.family, input.fastener === "rivet" ? "rivet" : "screw"];
    if (type.clip) families.push(type.clip);
    if (type.cap) families.push(type.cap);
    if (type.edges) families.push("edge_top_ives", "edge_bottom_ives");
    if (RULES.profiles[input.profile]) families.push(RULES.profiles[input.profile]);
    return families;
  }

  async function fetchText(url) {
    const res = await fetch(url, { credentials: "same-origin" });
    if (!res.ok) throw new Error("HTTP " + res.status + " " + url);
    const bytes = new Uint8Array(await res.arrayBuffer());
    // UNAS serves the child sitemaps as raw .xml.gz files.
    if (bytes[0] === 0x1f && bytes[1] === 0x8b) {
      return new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"))).text();
    }
    return new TextDecoder("utf-8").decode(bytes);
  }

  function locs(xml) {
    const re = /<loc>([^<]+)<[/]loc>/g;
    const out = [];
    let m;
    while ((m = re.exec(xml))) out.push(decodeEntities(m[1]).trim());
    return out;
  }

  // One shared cache per page load: every widget on the page reuses it.
  const live = { index: null, pages: new Map() };

  function liveIndex() {
    if (!live.index) {
      live.index = fetchText(SITEMAP).then(async function (xml) {
        const children = locs(xml);
        const urls = [];
        for (const child of children) urls.push.apply(urls, locs(await fetchText(child)));
        return urls.map(function (u) { return { url: u, family: familyForUrl(u) }; })
          .filter(function (e) { return e.family; });
      });
    }
    return live.index;
  }

  function livePage(url) {
    if (!live.pages.has(url)) {
      live.pages.set(url, fetchText(url).then(function (page) { return parseProductPage(url, page); }, function () { return null; }));
    }
    return live.pages.get(url);
  }

  // A catalogue with current data for these families, or null if any of them
  // cannot be found or read.
  async function liveCatalogue(families) {
    const index = await liveIndex();
    const urls = index.filter(function (e) { return families.indexOf(e.family) !== -1; }).map(function (e) { return e.url; });
    // Sorted like fetch_products.py, so the colour list keeps its order.
    const loaded = (await Promise.all(urls.map(livePage))).filter(Boolean).sort(function (x, y) {
      return x.family < y.family ? -1 : x.family > y.family ? 1 : x.name.localeCompare(y.name);
    });
    const ok = families.every(function (f) {
      return loaded.some(function (p) { return p.family === f && p.cartSku && p.price > 0; });
    });
    return ok ? { fetched: new Date().toISOString().slice(0, 10), source: "live", products: loaded } : null;
  }

  // ---------------------------------------------------------------------------
  // UI

  const CSS = [
    ".lik{--lik-accent:#e62701;--lik-brand:linear-gradient(90deg,#e69a01 0%,#e62701 100%);--lik-line:#dde1e6;--lik-soft:#f5f6f8;--lik-ink:#1d232b;--lik-muted:#5b6672;color:var(--lik-ink);font:inherit;max-width:1200px;margin:0 auto;container-type:inline-size}",
    ".lik *{box-sizing:border-box}",
    ".lik h2{font-size:1.5em;margin:0 0 .3em}",
    ".lik p{margin:0 0 .8em}",
    ".lik-muted{color:var(--lik-muted);font-size:.9em}",
    ".lik-layout{display:grid;grid-template-columns:1fr;gap:20px;align-items:start;margin-top:14px}",
    ".lik-form{display:flex;flex-direction:column;gap:14px;margin:0}",
    ".lik-sec{display:block;border:0;margin:0;padding:18px;background:var(--lik-soft);border-radius:10px;min-width:0}",
    // A legend sits on the fieldset border unless it floats.
    ".lik-sec-title{float:left;width:100%;display:flex;align-items:center;gap:10px;font-weight:700;font-size:1.05em;padding:0;margin:0 0 14px}",
    ".lik-sec-title+*{clear:both}",
    ".lik-sec-num{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:var(--lik-brand);color:#fff;font-size:.9em;flex:none}",
    ".lik-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px 18px}",
    ".lik-field{display:flex;flex-direction:column;gap:6px;min-width:0}",
    ".lik-wide{grid-column:1/-1}",
    ".lik-field>label,.lik-legend{font-weight:600;font-size:.95em}",
    ".lik input[type=number],.lik select{font:inherit;padding:9px 10px;border:1px solid var(--lik-line);border-radius:7px;background:#fff;width:100%;min-height:42px}",
    ".lik-seg{display:flex;flex-wrap:wrap;gap:8px}",
    ".lik-seg label{display:flex;align-items:center;gap:7px;border:1px solid var(--lik-line);background:#fff;border-radius:7px;padding:9px 12px;cursor:pointer;min-height:42px}",
    ".lik-seg input{accent-color:var(--lik-accent)}",
    ".lik-seg label:has(input:checked){border-color:var(--lik-accent);box-shadow:0 0 0 1px var(--lik-accent)}",
    ".lik-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:10px}",
    ".lik-card{position:relative;display:flex;flex-direction:column;align-items:center;gap:8px;padding:12px 10px;border:1px solid var(--lik-line);border-radius:10px;background:#fff;cursor:pointer;text-align:center;font-weight:600;font-size:.95em;transition:border-color .15s,box-shadow .15s}",
    ".lik-card input{position:absolute;opacity:0;pointer-events:none}",
    ".lik-card:hover{border-color:#b8bec6}",
    ".lik-card:has(input:checked){border-color:var(--lik-accent);box-shadow:0 0 0 2px var(--lik-accent)}",
    ".lik-card:has(input:focus-visible){outline:2px solid var(--lik-ink);outline-offset:2px}",
    ".lik-card-media{display:flex;align-items:center;justify-content:center;width:56px;height:44px;color:var(--lik-muted)}",
    ".lik-card-media img{max-width:100%;max-height:100%;object-fit:contain}",
    ".lik-card:has(input:checked) .lik-card-media{color:var(--lik-accent)}",
    ".lik-swatches{grid-template-columns:repeat(auto-fill,minmax(96px,1fr))}",
    ".lik-swatch{padding:8px 8px 10px}",
    ".lik-swatch .lik-card-media{width:100%;height:auto;aspect-ratio:1;border-radius:6px;overflow:hidden;background:var(--lik-soft)}",
    ".lik-swatch .lik-card-media img{width:100%;height:100%;max-width:none;max-height:none;object-fit:cover;transform:scale(4.5)}",
    ".lik-check{display:flex;align-items:center;gap:8px}",
    ".lik-hint{font-size:.85em;color:var(--lik-muted)}",
    ".lik [hidden]{display:none!important}",
    ".lik-side{min-width:0}",
    ".lik-result{background:#fff;border:1px solid var(--lik-line);border-radius:10px;padding:16px}",
    ".lik-result-title{font-weight:700;font-size:1.05em;margin:0 0 10px}",
    ".lik-table{width:100%;border-collapse:collapse;font-size:.92em}",
    ".lik-table th,.lik-table td{padding:8px 6px;border-bottom:1px solid var(--lik-line);text-align:left;vertical-align:top}",
    ".lik-table th{background:var(--lik-soft);font-weight:600}",
    ".lik-table tbody tr:nth-child(even) td{background:#fafbfc}",
    ".lik-num{text-align:right!important;white-space:nowrap;font-variant-numeric:tabular-nums}",
    ".lik-table a{color:inherit}",
    ".lik-total td{font-weight:700;font-size:1.1em;border-bottom:none}",
    ".lik-info{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px;margin:0 0 12px}",
    ".lik-info>div{display:flex;gap:9px;align-items:flex-start;background:var(--lik-soft);border-radius:8px;padding:9px 11px;font-size:.9em}",
    ".lik-info-icon{flex:none;width:22px;height:22px;color:#9aa3ad;margin-top:1px}",
    ".lik-info b{display:block;font-size:1.12em}",
    ".lik-note{border-left:4px solid #b7791f;background:#fff8e1;padding:9px 12px;border-radius:6px;margin:10px 0}",
    ".lik-error{border-left:4px solid #c92a2a;background:#fff0f0;padding:9px 12px;border-radius:6px;margin:10px 0}",
    ".lik-ok{border-left:4px solid #2b8a3e;background:#ebfbee;padding:9px 12px;border-radius:6px;margin:10px 0}",
    ".lik-actions{display:flex;flex-wrap:wrap;gap:10px;margin:16px 0 8px}",
    ".lik-btn{font:inherit;font-weight:600;border-radius:8px;padding:12px 18px;cursor:pointer;border:1px solid var(--lik-ink);background:#fff;color:var(--lik-ink);text-decoration:none;display:inline-flex;align-items:center;justify-content:center;min-height:46px}",
    ".lik-btn-primary{background:var(--lik-brand);border-color:transparent;color:#fff;font-weight:700;text-transform:uppercase;letter-spacing:.02em;flex:1 1 100%}",
    ".lik-btn-primary:hover{filter:brightness(1.06)}",
    ".lik-btn[disabled]{opacity:.55;cursor:wait}",
    // Columns follow the widget's own width, not the window's: the shop's
    // content box is much narrower than the screen.
    "@container (min-width:900px){.lik-layout{grid-template-columns:minmax(0,1.7fr) minmax(340px,1fr)}.lik-side{position:sticky;top:16px;max-height:calc(100vh - 32px);overflow:auto}}",
    "@container (max-width:560px){.lik-grid{grid-template-columns:1fr}.lik-sec{padding:14px}.lik-table .lik-hide-sm{display:none}}",
  ].join(NL);

  // Line icons for the option cards and summary boxes. A layout or slat type
  // with an image URL (LAYOUTS[i].image, RULES.slatTypes[k].image) shows that
  // picture instead of its icon.
  const SVG_OPEN = '<svg viewBox="0 0 48 36" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">';
  const ICONS = {
    horizontal: '<path d="M6 8h36M6 18h36M6 28h36"/><path d="M4 4v28M44 4v28" stroke-width="1.5"/>',
    vertical: '<path d="M10 6v24M18 6v24M26 6v24M34 6v24"/><path d="M4 12h40M4 24h40" stroke-width="1.5"/>',
    c: '<path d="M8 12v12h32V12"/><path d="M8 12h5M40 12h-5"/>',
    ives: '<path d="M8 24c4-12 28-12 32 0"/><path d="M8 24h32" stroke-width="1.5"/>',
    rusztikus: '<path d="M8 22c4-6 8-6 12 0s8 6 12 0 6-4 8-2"/><path d="M8 26h32" stroke-width="1.5"/>',
    budo: '<rect x="8" y="12" width="32" height="12" rx="2"/>',
    slats: '<path d="M6 10h36M6 18h36M6 26h36"/>',
    posts: '<path d="M10 6v26M24 6v26M38 6v26"/><path d="M6 32h36" stroke-width="1.5"/>',
    rows: '<path d="M8 8h32M8 16h32M8 24h32"/><path d="M4 8v0M4 16v0M4 24v0"/>',
    points: '<path d="M6 18h36"/><circle cx="10" cy="18" r="3"/><circle cx="38" cy="18" r="3"/><circle cx="24" cy="18" r="3"/>',
    height: '<path d="M24 4v28M18 9l6-5 6 5M18 27l6 5 6-5"/>',
    rails: '<path d="M6 12h36M6 24h36"/><path d="M12 6v24M36 6v24" stroke-width="1.5"/>',
    length: '<path d="M4 18h40M9 12l-5 6 5 6M39 12l5 6-5 6"/>',
  };
  function icon(name) { return SVG_OPEN + (ICONS[name] || "") + "</svg>"; }
  const FACT_ICONS = {
    "Lécek": "slats", "Oszlopok": "posts", "Sorok mezőnként": "rows", "Rögzítési pontok": "points",
    "Valós magasság": "height", "Tartógerenda": "rails", "Lefedett hossz": "length",
  };
  const LAYOUTS = [
    { value: "horizontal", label: "Vízszintes lécek", image: null },
    { value: "vertical", label: "Függőleges lécek", image: null },
  ];

  function card(name, value, label, iconName, image) {
    const media = image ? '<img src="' + esc(image) + '" alt="">' : icon(iconName);
    return '<label class="lik-card"><input type="radio" name="' + name + '" value="' + value + '">' +
      '<span class="lik-card-media">' + media + "</span><span>" + esc(label) + "</span></label>";
  }

  // The slat named by ?termek= (the button src/shop.js adds to slat pages):
  // its type and colour by the same name rules as the live catalogue, or
  // null when the name is missing or not a known slat type.
  function linkedSlat() {
    const name = new URLSearchParams(root.location ? root.location.search : "").get("termek");
    if (!name) return null;
    const family = familyForName(name.trim());
    const type = Object.keys(RULES.slatTypes).find(function (k) { return RULES.slatTypes[k].family === family; });
    return type ? { type: type, colour: colourForName(name) } : null;
  }

  // The shop stores each product's main photo under its SKU. The colour tiles
  // zoom into its middle, so the finish fills the square.
  const PHOTO_BASE = "https://lemezinez.hu/img/18169/";
  function photoFor(product) {
    return product && product.sku ? PHOTO_BASE + product.sku + "/280x280,r/" + product.sku + ".jpg" : null;
  }
  function colourCard(colour, product, checked) {
    const photo = photoFor(product);
    return '<label class="lik-card lik-swatch"><input type="radio" name="lik-colour" value="' + colour + '"' + (checked ? " checked" : "") + ">" +
      '<span class="lik-card-media">' + (photo ? '<img src="' + esc(photo) + '" alt="" loading="lazy">' : "") + "</span>" +
      "<span>" + esc(COLOUR_LABELS[colour] || colour) + "</span></label>";
  }

  function mount(container) {
    if (container.dataset.likMounted) return;
    container.dataset.likMounted = "1";
    if (!document.getElementById("lik-style")) {
      const style = document.createElement("style");
      style.id = "lik-style";
      style.textContent = CSS;
      document.head.appendChild(style);
    }
    const dryRun = container.dataset.dryRun === "1" || !isShop();
    const preset = container.dataset.type;
    const linked = linkedSlat();
    // A linked colour only some live product offers waits for the live list.
    let wantedColour = linked ? linked.colour : null;
    const state = {
      layout: "horizontal", type: linked ? linked.type : RULES.slatTypes[preset] ? preset : "c", colour: null,
      lengthM: "", heightCm: 180, gapCm: RULES.defaultGapCm, maxPostSpacingCm: RULES.maxPostSpacingCm,
      fastener: "screw", profileQty: "", profileQtyAuto: true,
    };
    Object.keys(RULES.defaults).forEach(function (k) { state[k] = RULES.defaults[k]; });
    let last = null;

    const layoutCards = LAYOUTS.map(function (l) { return card("lik-layout", l.value, l.label, l.value, l.image); }).join("");
    const typeCards = Object.keys(RULES.slatTypes).map(function (k) {
      return card("lik-type", k, RULES.slatTypes[k].label, k, RULES.slatTypes[k].image);
    }).join("");
    const gapOptions = RULES.gapPresets.map(function (p, i) {
      return '<label><input type="radio" name="lik-gappreset" value="' + i + '"> ' + esc(p.label) + "</label>";
    }).join("");
    const supportOptions = Array.from({ length: RULES.horizontal.maxMiddleSupports + 1 }, function (_, n) {
      return '<option value="' + n + '">' + (n ? n + " db" : "Nincs") + "</option>";
    }).join("");
    const profileOptions = '<option value="none">Nem kérek profilt</option>' + Object.keys(RULES.profiles).map(function (k) {
      return '<option value="' + k + '">' + esc(RULES.profileLabels[k]) + "</option>";
    }).join("");

    container.innerHTML =
      '<div class="lik">' +
      "<h2>Kerítéskalkulátor</h2>" +
      "<p>Adja meg a kerítés méreteit, és kiszámoljuk, mennyi lécre és kiegészítőre lesz szüksége. A teljes listát egy gombnyomással a kosárba teheti.</p>" +
      '<div class="lik-layout">' +
      '<form class="lik-form" novalidate>' +
      '<fieldset class="lik-sec"><legend class="lik-sec-title"><span class="lik-sec-num">1</span>Stílus és elrendezés</legend><div class="lik-grid">' +
      '<div class="lik-field lik-wide"><span class="lik-legend" id="lik-l-layout">Elrendezés</span><div class="lik-cards" role="radiogroup" aria-labelledby="lik-l-layout">' + layoutCards + "</div></div>" +
      '<div class="lik-field lik-wide"><span class="lik-legend" id="lik-l-type">Léc típusa</span><div class="lik-cards" role="radiogroup" aria-labelledby="lik-l-type">' + typeCards + "</div></div>" +
      '<div class="lik-field lik-wide"><span class="lik-legend" id="lik-l-colour">Szín</span><div class="lik-cards lik-swatches" id="lik-colour" role="radiogroup" aria-labelledby="lik-l-colour"></div></div>' +
      "</div></fieldset>" +
      '<fieldset class="lik-sec"><legend class="lik-sec-title"><span class="lik-sec-num">2</span>Méretek</legend><div class="lik-grid">' +
      '<div class="lik-field"><label for="lik-length">Kerítés hossza (m)</label><input id="lik-length" type="number" inputmode="decimal" min="0.3" max="500" step="0.1" placeholder="pl. 18"></div>' +
      '<div class="lik-field"><label for="lik-height">Kerítés magassága (cm)</label><input id="lik-height" type="number" inputmode="numeric" min="30" max="300" step="1"></div>' +
      '<div class="lik-field lik-wide"><span class="lik-legend" id="lik-l-gap">Hézag két léc között</span><div class="lik-seg" role="radiogroup" aria-labelledby="lik-l-gap">' + gapOptions + "</div></div>" +
      '<div class="lik-field"><label for="lik-gap">Hézag pontosan (cm)</label><input id="lik-gap" type="number" inputmode="decimal" min="0" max="' + RULES.maxGapCm + '" step="0.5"></div>' +
      '<div class="lik-field" data-only="horizontal"><label for="lik-spacing">Oszloptávolság legfeljebb (cm)</label><input id="lik-spacing" type="number" inputmode="numeric" min="30" max="300" step="1"><span class="lik-hint">A lécek hossza az oszloptávolsággal egyezik.</span></div>' +
      "</div></fieldset>" +
      '<fieldset class="lik-sec"><legend class="lik-sec-title"><span class="lik-sec-num">3</span>Rögzítés és részletek</legend><div class="lik-grid">' +
      '<div class="lik-field"><label for="lik-fastener">Kötőelem</label><select id="lik-fastener"><option value="screw">Önfúró csavar</option><option value="rivet">Popszegecs</option></select></div>' +
      '<div class="lik-field" data-only="horizontal"><label for="lik-supports">Köztes alátámasztás a léc mögött</label><select id="lik-supports">' + supportOptions + "</select>" +
      '<span class="lik-hint">A léc két végén mindig van rögzítés. Minden köztes alátámasztásnál még egy rögzítési pont kell.</span></div>' +
      '<div class="lik-field lik-wide" data-only="horizontal" data-needs="clip"><span class="lik-legend" id="lik-l-mode">Rögzítés módja</span><div class="lik-seg" role="radiogroup" aria-labelledby="lik-l-mode">' +
      '<label><input type="radio" name="lik-mode" value="clip"> Klipsszel</label>' +
      '<label><input type="radio" name="lik-mode" value="direct"> Klipsz nélkül</label></div></div>' +
      '<div class="lik-field" data-needs="cap"><label for="lik-caps" data-cap-label>Végzáró lécenként</label><select id="lik-caps">' +
      '<option value="0">Nincs</option><option value="1">1 db</option><option value="2">2 db</option></select>' +
      '<span class="lik-hint" data-needs="edges">Íves lécnél az 1 db a felső élvédő.</span></div>' +
      '<div class="lik-field"><label for="lik-profile">Felfogató profil</label><select id="lik-profile">' + profileOptions + "</select></div>" +
      '<div class="lik-field" data-needs="profile"><label for="lik-profileqty">Profilok száma (db)</label><input id="lik-profileqty" type="number" inputmode="numeric" min="1" max="' + RULES.maxProfileQty + '" step="1"></div>' +
      '<span class="lik-hint lik-wide">A kerítés kialakításától függ, hogy kell-e profil, és ha igen, melyik. A javasolt darabszám a két szélső oszlopra szól.</span>' +
      "</div></fieldset>" +
      "</form>" +
      '<aside class="lik-side"><div class="lik-result" aria-live="polite"></div></aside>' +
      "</div>" +
      "</div>";

    const form = container.querySelector("form");
    const out = container.querySelector(".lik-result");
    const el = function (id) { return container.querySelector("#" + id); };

    // Current shop data, one catalogue per set of families a calculation needs.
    // undefined = still loading, null = failed (the baked CATALOGUE is used).
    const useLive = isShop() && typeof DecompressionStream !== "undefined" && container.dataset.live !== "0";
    const liveCats = new Map();
    function liveEntry() { return liveCats.get(neededFamilies(state).join(",")); }
    function currentCatalogue() {
      const entry = liveEntry();
      return entry && entry.value ? entry.value : CATALOGUE;
    }
    function refreshLive() {
      if (!useLive) return;
      const families = neededFamilies(state);
      const key = families.join(",");
      if (liveCats.has(key)) return;
      const entry = { value: undefined };
      liveCats.set(key, entry);
      liveCatalogue(families)
        .then(function (c) { entry.value = c; }, function () { entry.value = null; })
        .then(function () {
          if (neededFamilies(state).join(",") !== key) return;
          fillColours();
          render();
        });
    }
    function pricesNote(catalogue) {
      const entry = liveEntry();
      if (useLive && entry && entry.value === undefined) return " Az aktuális árakat most töltjük be.";
      if (catalogue !== CATALOGUE) return "";
      return " Az aktuális árakat nem sikerült betölteni, ezért a lista korábbi árakkal számol (utolsó frissítés: " + CATALOGUE.fetched.split("-").join(". ") + ".).";
    }

    function fillColours() {
      const catalogue = currentCatalogue();
      const family = RULES.slatTypes[state.type].family;
      const colours = coloursFor(catalogue, state.type);
      if (wantedColour && colours.indexOf(wantedColour) !== -1) { state.colour = wantedColour; wantedColour = null; }
      if (colours.indexOf(state.colour) === -1) state.colour = colours[0] || null;
      el("lik-colour").innerHTML = colours.map(function (c) {
        const product = findProduct(catalogue, family, c);
        // A live product without an SKU borrows the baked one's photo.
        const pictured = product && product.sku ? product : findProduct(CATALOGUE, family, c);
        return colourCard(c, pictured, c === state.colour);
      }).join("");
    }

    function syncForm() {
      form.querySelectorAll('[name="lik-layout"]').forEach(function (r) { r.checked = r.value === state.layout; });
      form.querySelectorAll('[name="lik-type"]').forEach(function (r) { r.checked = r.value === state.type; });
      fillColours();
      el("lik-fastener").value = state.fastener;
      el("lik-length").value = state.lengthM;
      el("lik-height").value = state.heightCm;
      el("lik-gap").value = state.gapCm;
      el("lik-spacing").value = state.maxPostSpacingCm;
      el("lik-supports").value = String(state.middleSupports);
      form.querySelectorAll('[name="lik-mode"]').forEach(function (r) { r.checked = r.value === state.fixingMode; });
      el("lik-caps").value = String(state.caps);
      el("lik-profile").value = state.profile;
      el("lik-profileqty").value = state.profileQty;
      applyVisibility();
    }

    // Show only the fields that matter for the current layout and slat type.
    function applyVisibility() {
      const type = RULES.slatTypes[state.type];
      const show = {
        clip: Boolean(type.clip),
        // Íves takes edge guards only upright (rule 16).
        cap: Boolean(type.cap || (type.edges && state.layout === "vertical")),
        edges: Boolean(type.edges && state.layout === "vertical"),
        profile: state.profile !== "none",
      };
      form.querySelectorAll("[data-only], [data-needs]").forEach(function (n) {
        const layoutOk = !n.dataset.only || n.dataset.only === state.layout;
        const needOk = !n.dataset.needs || show[n.dataset.needs];
        n.hidden = !(layoutOk && needOk);
      });
      // Íves slats take edge guards (élvédő) where the others take end caps.
      const word = type.edges ? "élvédő" : "végzáró";
      form.querySelectorAll("[data-cap-label]").forEach(function (n) { n.textContent = word[0].toUpperCase() + word.slice(1) + " lécenként"; });
      const gap = Number(state.gapCm);
      const presets = RULES.gapPresets;
      form.querySelectorAll('[name="lik-gappreset"]').forEach(function (r) {
        const i = Number(r.value);
        const upTo = i + 1 < presets.length ? presets[i + 1].min : Infinity;
        r.checked = state.gapCm !== "" && gap >= presets[i].min && gap < upTo;
      });
    }

    function readForm(target) {
      const checked = function (name) { const r = form.querySelector('[name="' + name + '"]:checked'); return r ? r.value : null; };
      if (target && (target.name === "lik-type" || target.name === "lik-colour")) wantedColour = null;
      state.layout = checked("lik-layout") || state.layout;
      const newType = checked("lik-type") || state.type;
      if (newType !== state.type) { state.type = newType; fillColours(); }
      state.colour = checked("lik-colour") || state.colour;
      state.fastener = el("lik-fastener").value;
      state.lengthM = String(el("lik-length").value).replace(",", ".");
      state.heightCm = el("lik-height").value;
      if (target && target.name === "lik-gappreset") {
        state.gapCm = RULES.gapPresets[Number(target.value)].gapCm;
        el("lik-gap").value = state.gapCm;
      } else {
        state.gapCm = String(el("lik-gap").value).replace(",", ".");
      }
      state.maxPostSpacingCm = el("lik-spacing").value;
      state.middleSupports = el("lik-supports").value;
      state.fixingMode = checked("lik-mode") || state.fixingMode;
      state.caps = Number(el("lik-caps").value);
      // The profile quantity follows the height until the customer types one.
      const newProfile = el("lik-profile").value;
      if (target && target.id === "lik-profileqty") state.profileQtyAuto = false;
      if (newProfile === "none") state.profileQtyAuto = true;
      const suggested = suggestedProfileQty(state.heightCm);
      if (newProfile !== "none" && state.profileQtyAuto && suggested) el("lik-profileqty").value = suggested;
      state.profile = newProfile;
      state.profileQty = el("lik-profileqty").value;
      applyVisibility();
    }

    function render() {
      refreshLive();
      if (!state.lengthM) {
        out.innerHTML = '<p class="lik-muted">Adja meg a kerítés hosszát az eredményhez.</p>';
        last = null;
        return;
      }
      const catalogue = currentCatalogue();
      const result = calculate(state, catalogue);
      last = result;
      if (!result.ok) {
        out.innerHTML = result.errors.map(function (e) { return '<div class="lik-error">' + esc(e) + "</div>"; }).join("");
        return;
      }
      const i = result.info;
      const facts = state.layout === "vertical"
        ? [["Lécek", i.slatCount + " db × " + i.slatLengthCm + " cm"], ["Tartógerenda", i.rails + " sor × " + fmtNum(i.railLengthM) + " m"], ["Lefedett hossz", fmtNum(i.coveredLengthCm) + " cm"]]
        : [["Lécek", i.slatCount + " db × " + i.slatLengthCm + " cm"], ["Oszlopok", i.posts + " db, " + fmtNum(i.postSpacingCm) + " cm-enként"], ["Sorok mezőnként", i.rows + " léc"], ["Rögzítési pontok", "lécenként " + i.supportPoints], ["Valós magasság", fmtNum(i.actualHeightCm) + " cm"]];
      const rows = result.lines.map(function (l) {
        const detail = l.lengthCm ? l.lengthCm + " cm" : (l.role === "edge" ? esc(tidy(l.variantValue)) : "");
        return '<tr><td><a href="' + esc(l.product.url) + '" target="_blank" rel="noopener">' + esc(l.product.name) + "</a>" +
          (detail ? '<div class="lik-muted">' + detail + "</div>" : "") + "</td>" +
          '<td class="lik-num">' + l.qty + " db</td>" +
          '<td class="lik-num lik-hide-sm">' + fmtFt(l.unitPrice) + "</td>" +
          '<td class="lik-num">' + fmtFt(l.total) + "</td></tr>";
      }).join("");
      out.innerHTML =
        '<p class="lik-result-title">Anyaglista</p>' +
        '<div class="lik-info">' + facts.map(function (f) {
          return '<div><span class="lik-info-icon">' + icon(FACT_ICONS[f[0]]) + "</span><span>" + esc(f[0]) + "<b>" + esc(f[1]) + "</b></span></div>";
        }).join("") + "</div>" +
        result.warnings.map(function (w) { return '<div class="lik-note">' + esc(w) + "</div>"; }).join("") +
        '<table class="lik-table"><thead><tr><th>Termék</th><th class="lik-num">Mennyiség</th><th class="lik-num lik-hide-sm">Egységár</th><th class="lik-num">Összesen</th></tr></thead><tbody>' + rows +
        '</tbody><tfoot><tr class="lik-total"><td colspan="2">Összesen (bruttó, szállítás nélkül)</td><td class="lik-num lik-hide-sm"></td><td class="lik-num">' + fmtFt(result.total) + "</td></tr></tfoot></table>" +
        '<p class="lik-muted">Az oszlopokat és a tartógerendákat a lista nem tartalmazza. A kötőelemekből ' + RULES.sparePercent + "% tartalékot számoltunk. A kalkuláció tájékoztató jellegű, a végleges árat a kosár mutatja." + pricesNote(catalogue) + " Kérdése van? Hívjon: " + PHONE + ".</p>" +
        '<div class="lik-actions">' +
        '<button type="button" class="lik-btn lik-btn-primary" data-act="cart">Mind a kosárba</button>' +
        '<button type="button" class="lik-btn" data-act="copy">Lista másolása</button>' +
        '<a class="lik-btn" href="' + QUOTE_PAGE + '">Inkább ajánlatot kérek</a>' +
        "</div>" +
        '<div class="lik-status" role="status"></div>';
    }

    async function toCart(button) {
      if (!last || !last.ok) return;
      const status = out.querySelector(".lik-status");
      button.disabled = true;
      const lines = last.lines;
      if (dryRun) {
        status.innerHTML = '<div class="lik-note">Bemutató mód: a kosár nem módosult. ' + lines.length + " tétel kerülne a kosárba.</div>";
        if (root.console) root.console.info("[lik] dry run", lines.map(function (l) { return { sku: l.product.cartSku, qty: l.qty, variant: l.variantValue }; }));
        button.disabled = false;
        return;
      }
      let done = 0;
      try {
        for (const line of lines) {
          status.innerHTML = '<div class="lik-note">Kosárba helyezés: ' + (done + 1) + " / " + lines.length + "…</div>";
          await addLineToCart(line);
          done++;
        }
        status.innerHTML = '<div class="lik-ok">Minden tétel a kosárba került. Átirányítjuk a kosárhoz…</div>';
        location.href = CART_PAGE;
      } catch (err) {
        status.innerHTML = '<div class="lik-error">Nem sikerült minden tételt a kosárba tenni (' + done + " / " + lines.length + " sikerült): " + esc(err.message) +
          '. Kérjük, ellenőrizze a <a href="' + CART_PAGE + '">kosarat</a>, vagy hívjon: ' + PHONE + ".</div>";
        button.disabled = false;
      }
    }

    function copyList() {
      if (!last || !last.ok) return;
      const text = listAsText(last, state);
      const status = out.querySelector(".lik-status");
      const done = function () { status.innerHTML = '<div class="lik-ok">A lista a vágólapra került.</div>'; };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { status.innerHTML = '<div class="lik-note"><pre>' + esc(text) + "</pre></div>"; });
      } else {
        status.innerHTML = '<div class="lik-note"><pre>' + esc(text) + "</pre></div>";
      }
    }

    form.addEventListener("input", function (e) { readForm(e.target); render(); });
    form.addEventListener("change", function (e) { readForm(e.target); render(); });
    form.addEventListener("submit", function (e) { e.preventDefault(); });
    // A click on the preset that is already lit fires no change: apply it anyway.
    form.addEventListener("click", function (e) {
      if (e.target.name === "lik-gappreset") { readForm(e.target); render(); }
    });
    out.addEventListener("click", function (e) {
      const btn = e.target.closest("[data-act]");
      if (!btn) return;
      if (btn.dataset.act === "cart") toCart(btn);
      if (btn.dataset.act === "copy") copyList();
    });

    syncForm();
    render();
  }

  function mountAll() {
    document.querySelectorAll("#li-kalkulator, [data-li-kalkulator]").forEach(mount);
  }

  const api = { parseProductPage: parseProductPage, familyForUrl: familyForUrl, neededFamilies: neededFamilies, liveCatalogue: liveCatalogue, calculate: calculate, priceAtLength: priceAtLength, lengthValue: lengthValue, coloursFor: coloursFor, suggestedProfileQty: suggestedProfileQty, addLineToCart: addLineToCart, RULES: RULES, CATALOGUE: CATALOGUE, listAsText: listAsText };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  } else {
    root.LemezInezKalkulator = api;
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mountAll);
    else mountAll();
  }
})(typeof window !== "undefined" ? window : globalThis);
