﻿using System.Web.Optimization;

namespace Spectrum.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            // This is great for testing if bundling is working correctly for Release
            BundleTable.EnableOptimizations = false;

            bundles.Add(new StyleBundle("~/bundles/vendor/styles")
                .Include(
                    "~/bower_components/bootstrap/dist/css/bootstrap.css",
                    "~/bower_components/bootstrap-tour/build/css/bootstrap-tour.min.css",
                    "~/bower_components/angular-notify/dist/angular-notify.min.css",
                    "~/bower_components/metisMenu/dist/metisMenu.css",
                    "~/bower_components/animate.css/animate.css",
                    "~/bower_components/sweetalert/dist/sweetalert.css",
                    "~/bower_components/summernote/dist/summernote.css",
                    "~/bower_components/angular-ui-tree/dist/angular-ui-tree.min.css",
                    "~/bower_components/angular-xeditable/dist/css/xeditable.css",
                    "~/bower_components/ui-select/dist/select.min.css",
                    "~/bower_components/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css",
                    "~/bower_components/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css",
                    "~/bower_components/blueimp-gallery/css/blueimp-gallery.min.css",
                    "~/bower_components/angular-ui-grid/ui-grid.css"
                ));

            // Named this way to correctly serve fonts using the path
            // probably a better way of doing this
            bundles.Add(new StyleBundle("~/Content/css")
                .Include(
                    "~/Content/font-awesome.css",
                    "~/Content/fonts/pe-icon-7-stroke/css/pe-icon-7-stroke.css",
                    "~/Content/fonts/pe-icon-7-stroke/css/helper.css",
                    "~/Content/fonts/open-sans/css/OpenSans.css",
                    "~/Content/style.css"
                ));

            bundles.Add(new ScriptBundle("~/bundles/vendor")
                .Include(
                    "~/bower_components/jquery/dist/jquery.js",
                    "~/bower_components/jquery-ui/jquery-ui.min.js",
                    "~/bower_components/slimScroll/jquery.slimscroll.min.js",
                    "~/bower_components/jquery-flot/jquery.flot.js",
                    "~/bower_components/jquery-flot/jquery.flot.resize.js",
                    "~/bower_components/jquery-flot/jquery.flot.pie.js",
                    "~/bower_components/flot.curvedlines/curvedLines.js",
                    "~/bower_components/jquery.flot.spline/index.js",
                    "~/bower_components/peity/jquery.peity.min.js",
                    "~/bower_components/bootstrap/dist/js/bootstrap.min.js",
                    "~/bower_components/bootstrap-tour/build/js/bootstrap-tour.min.js",
                    "~/bower_components/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js",
                    "~/bower_components/metisMenu/dist/metisMenu.min.js",
                    "~/Scripts/homer.js",
                    "~/bower_components/sweetalert/dist/sweetalert-dev.js",
                    "~/bower_components/iCheck/icheck.min.js",
                    "~/bower_components/sparkline/index.js",
                    "~/bower_components/Chart.js/Chart.min.js",
                    "~/bower_components/moment/min/moment.min.js",
                    "~/bower_components/fullcalendar/dist/fullcalendar.min.js",
                    "~/bower_components/summernote/dist/summernote.min.js",
                    "~/bower_components/blueimp-gallery/js/jquery.blueimp-gallery.min.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/vendor/angular")
                .Include(
                    "~/bower_components/angular/angular.js",
                    "~/bower_components/angular-sanitize/angular-sanitize.min.js",
                    "~/bower_components/angular-animate/angular-animate.min.js",
                    "~/bower_components/angular-route/angular-route.min.js",
                    "~/bower_components/angular-resource/angular-resource.min.js",
                    "~/bower_components/angular-ui-router/release/angular-ui-router.min.js",
                    "~/bower_components/angular-bootstrap/ui-bootstrap-tpls.js",
                    "~/bower_components/angular-ui/angular-ui.js",
                    "~/bower_components/angular-notify/dist/angular-notify.min.js",
                    "~/bower_components/angular-flot/angular-flot.js",
                    "~/bower_components/angular-peity/angular-peity.js",
                    "~/bower_components/angular-ui-utils/modules/utils.js",
                    "~/bower_components/angular-ui-map/ui-map.js",
                    "~/bower_components/angular-ui-calendar/src/calendar.js",
                    "~/bower_components/angular-summernote/dist/angular-summernote.min.js",
                    "~/bower_components/angular-ui-tree/dist/angular-ui-tree.min.js",
                    "~/bower_components/angular-bootstrap-tour/dist/angular-bootstrap-tour.min.js",
                    "~/bower_components/angular-xeditable/dist/js/xeditable.min.js",
                    "~/bower_components/angular-ui-sortable/sortable.min.js",
                    "~/bower_components/angular-touch/angular-touch.js",
                    "~/bower_components/angular-sweetalert/SweetAlert.js",
                    "~/bower_components/angular-ui-grid/ui-grid.js",
                    "~/bower_components/angular-drag-and-drop-lists/angular-drag-and-drop-lists.min.js",
                    "~/bower_components/angular-ui-event/dist/event.min.js",
                    "~/bower_components/angles/angles.js",
                    "~/bower_components/ui-select/dist/select.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/app/main")
                .Include(
                    "~/Scripts/app/core/core.module.js",
                    "~/Scripts/app/data/data.module.js",
                    "~/Scripts/app/data/userData.js",
                    "~/Scripts/app/data/incidentData.js",
                    "~/Scripts/app/eoc/eoc.module.js",
                    "~/Scripts/app/portal/portal.module.js",
                    "~/Scripts/app/app.js",
                    "~/Scripts/app/core/portal-identityfocus.js",
                    "~/Scripts/app/core/users-index.js",
                    "~/Scripts/app/eoc/checklists.js",
                    "~/Scripts/app/eoc/dashboard.js",
                    "~/Scripts/app/eoc/incident-management.js",
                    "~/Scripts/app/directives/loading-directive.js"
                ));
        }
    }
}