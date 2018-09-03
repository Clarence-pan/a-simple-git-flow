var graphConfig = new GitGraph.Template({
    branch: {
        color: "#000000",
        lineWidth: 3,
        spacingX: 60,
        mergeStyle: "straight",
        showLabel: true,                // display branch names on graph
        labelFont: "normal 10pt Arial",
        labelRotation: 0
    },
    commit: {
        spacingY: -30,
        dot: {
            size: 8,
            strokeColor: "#000000",
            strokeWidth: 4
        },
        tag: {
            font: "normal 10pt Arial",
            color: "yellow"
        },
        message: {
            color: "black",
            font: "normal 12pt Arial",
            displayAuthor: false,
            displayBranch: false,
            displayHash: false,
        }
    },
    arrow: {
        size: 8,
        offset: 3
    }
});

var config = {
  template: graphConfig,
  mode: "extended",
//   orientation: "horizontal"
  orientation: 'vertical',
};

var bugfixCommit = {
  messageAuthorDisplay:false,
  messageBranchDisplay:false,
  messageHashDisplay:false,
  message:"Bug fix commit(s)"
};

var stablizationCommit = {
  messageAuthorDisplay:false,
  messageBranchDisplay:false,
  messageHashDisplay:false,
  message:"Release stablization commit(s)"
};

// You can manually fix columns to control the display.
var testCol = 0;
var featureCol = 1;
var featureCol2 = 2;
var masterCol = 3;

var gitgraph = new GitGraph(config);

var master = gitgraph.branch({name:"master", column:masterCol});
master.commit("Initial commit");

var test = gitgraph.branch({parentBranch:master, name: "test", column: testCol});
master.commit({messageDisplay:false});
test.commit({messageDisplay:false});

var feature1 = gitgraph.branch({parentBranch: master, name:"feature-foo", column:featureCol});
feature1.commit("来了一个新特性/新项目")
        .commit({messageDisplay:false})
        .commit({messageDisplay:false})
feature1.merge(test, "开发得差不多了，合入测试环境测试foo (merge branch `feature-foo` into `test`)");

feature1.commit("fix bug: 某某某bug说明")
feature1.merge(test, "继续测试foo (merge branch `feature-foo` into `test`)");

feature1.commit("fix bug: 某某某bug说明2")
feature1.commit("fix bug: 某某某bug说明3")
feature1.merge(test, "继续测试foo (merge branch `feature-foo` into `test`)");

feature1.merge(master,"测试OK，上线foo (merge branch `feature-foo` into `master`)");



var feature2 = gitgraph.branch({parentBranch: master, name:"feature-bar", column:featureCol});
feature2.commit("又来了一个新特性/新项目")
feature2.commit({messageDisplay:false});

        

var feature3 = gitgraph.branch({parentBranch: master, name:"feature-bazz", column:featureCol2});
feature3.commit("又双叒叕来了一个新特性/新项目")
        .commit({messageDisplay:false})
        .commit({messageDisplay:false});
feature3.merge(test, "开发得差不多了，合入测试环境测试bazz (merge branch `feature-bazz` into `test`)");


feature2.commit({messageDisplay:false});
feature2.commit({messageDisplay:false});
feature2.merge(test, "开发得差不多了，合入测试环境测试bar (merge branch `feature-bar` into `test`)");

feature3.commit("fix bug: 某某某bug说明")
feature3.merge(test, "继续测试bazz (merge branch `feature-bazz` into `test`)");

feature3.merge(master,"测试OK，上线bazz (merge branch `feature-bazz` into `master`)");

feature2.commit("fix bug: 某某某bug说明")
feature2.merge(test, "继续测试bar (merge branch `feature-bar` into `test`)");

feature2.merge(master,"测试OK，上线bar (merge branch `feature-bar` into `master`)");


