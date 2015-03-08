/*
 * js-orgChart - 1.06
 * Copyright (c) 2013 rchockxm (rchockxm.silver@gmail.com)
 * Copyright (c) 2009 Surnfu composition
 *
 * Licensed - under the terms of the MIT License
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Based on: Surnfu - Email:Surnfu@126.com - QQ:31333716
 *           2009 Surnfu composition http://www.on-cn.com
 */
 
// --------------------------------------------------------------- 
// Author: rchockxm (rchockxm.silver@gmail.com)
// Url: http://rchockxm.com
// ---------------------------------------------------------------
function LoadGoogleOrgChartData(arrObj) {
    var HwndNode;
    var HwndObject = {};
    var DataSet = arrObj;
      
    for (var key in DataSet) {
        var Data = DataSet[key];
        var ParentNode = Data[1];
        var tCaption = (typeof Data[0].v == "string") ? Data[0].v : Data[0];
        var tInfoTip = Data[2];
        var tDescription = tInfoTip;
      
        HwndObject[tCaption] = new OrgNode();
        HwndObject[tCaption].customParam.Caption = tCaption;
        HwndObject[tCaption].customParam.InfoTip = tInfoTip;
        HwndObject[tCaption].customParam.Description = tDescription;
        HwndObject[tCaption].customParam.BackgroundImage = "";
        HwndObject[tCaption].customParam.Color = "";
      
        if (ParentNode == "") {
            HwndNode = HwndObject[tCaption];
        }
        
        if (ParentNode != "") {
            HwndObject[ParentNode].Nodes.Add(HwndObject[tCaption]);
        }  
    }
    
    return HwndNode;
}

function OrgOptions() {
    this.LineSize = 2;
    this.LineColor = "#000000";  
  
    this.IntervalWidth = 100;
    this.IntervalHeight = 40;
    this.Top = 0;
    this.Left = 0;    
    this.AutoPos = true;
    this.Depth = 0;

    this.paddingOffeSetTop = 0;
    this.paddingOffsetLeft = 0;

    this.EdgeWidth = null;
    this.EdgeHeight = null;
    this.EdgeTemplet = null;
    this.ShowType = null;
 
    var objOptions = {
        LineSize: this.LineSize,
        LineColor: this.LineColor,
        IntervalWidth: this.IntervalWidth,
        IntervalHeight: this.IntervalHeight,
        Top: this.Top,
        Left: this.Left,
        AutoPos: this.AutoPos,
        Depth: this.Depth,
        paddingOffeSetTop: this.paddingOffeSetTop,
        paddingOffsetLeft: this.paddingOffsetLeft,        
        EdgeWidth: this.EdgeWidth,
        EdgeHeight: this.EdgeHeight,
        EdgeTemplet: this.EdgeTemplet,
        ShowType: this.ShowType
    }
    
    return objOptions;
}

function OrgStyleSheet() {
    this.CssText = "";  
  
    var oCssStyles = {
        CssText: this.CssText
    }
    
    return oCssStyles;
}

function OrgNode(){
    this.Container = "OrgChart";
    this.SubContainer = "OrgNode";
    this.EdgeWidth = null;
    this.EdgeHeight = null;
    this.parentNode = null;
    this.NodeGroupId = null; 
    this.NodeOrderId = null; 
    this.TopLine = null;
    this.BottomLine = null;
    this.Depth = null;
    this.Top = null;
    this.Left = null;
    this.Type = null;
    this.Nodes = [];
    this.customParam = [];
    
    this.HightlightText = "";
    this.HightlightTextColor = "";
  
    var This = this;
  
    this.Nodes.Add = function(OrgNode_){
        OrgNode_.parentNode = This;
        This.Nodes[This.Nodes.length] = OrgNode_;
    }
    
    this.Edge = null;
    this.Templet = null;
    this.Id = this.SubContainer + "_" + GetRandomStringId(14);
    this.SubContainer = this.SubContainer + "_" + GetRandomStringId(10);
  
    this.inIt = function(){
        if (this.inIted == true) {
            return;
        }
        
        var tempDiv = document.createElement("DIV");
        tempDiv.id = this.SubContainer;
        
        var tContainer = document.getElementById(this.Container);
        if (tContainer == null || tContainer == undefined) {
            document.body.appendChild(tempDiv);  
        }
        else {
            tContainer.appendChild(tempDiv);    
        }
        
        var tempHTML = this.Templet;
        tempHTML = tempHTML.replace("{Id}", this.Id);
        
        for (var Param_ in this.customParam){
            tempHTML = tempHTML.replace("{" + Param_ + "}", this.customParam[Param_]);
            if (Param_ == "Caption") {
                tempHTML = tempHTML.replace("{UidName}", this.customParam[Param_]);
            }
        }
        
        if (this.HightlightText != null || this.HightlightText != "" || this.HightlightText != undefined) {
            if (this.HightlightTextColor != null || this.HightlightTextColor != "" || this.HightlightTextColor != undefined) { 
                tempHTML = tempHTML.replace(this.HightlightText, '<font color="' + this.HightlightTextColor + '">' + this.HightlightText + '</font>');
            }
        }       
                
        tempDiv.innerHTML = tempHTML;
        this.Edge = $(this.Id);
    
        if (this.EdgeWidth != null) {
            if (offset(this.Edge).w < this.EdgeWidth) {
                this.Edge.style.width = this.EdgeWidth + "px";
                if (offset(this.Edge).w > this.EdgeWidth) {
                    this.Edge.style.width = (this.EdgeWidth - (offset(this.Edge).w - this.EdgeWidth)) + "px";
                }
            }
        }
    
        if (this.EdgeHeight != null) {
            if (offset(this.Edge).h < this.EdgeHeight) {
                this.Edge.style.height = this.EdgeHeight + "px";
                if (offset(this.Edge).h > this.EdgeHeight) {
                    this.Edge.style.height = (this.EdgeHeight - (offset(this.Edge).h - this.EdgeHeight)) + "px";
                }
            }
        }

        this.Width = offset(this.Edge).w;
        this.Height = offset(this.Edge).h;
        this.inIted = true;
    }

    function GetRandomStringId(n_){
        var litter = "abcdefghijklmnopqrstuvwxyz";
        litter += litter.toUpperCase() + "1234567890";
      
        var idRnd = "";      
        for (var i=1; i<=n_; i++){
            idRnd += litter.substr((0 + Math.round(Math.random() * (litter.length - 0))), 1);
        }
        
        return idRnd;
    }
    
    function $(id){
        return document.getElementById(id)
    }
    
    function offset(node){
        var x = node.offsetLeft;
        var y = node.offsetTop;
        var w = node.offsetWidth;
        var h = node.offsetHeight;
        var parent = node.offsetParent;
      
        while (parent != null){
            x += parent.offsetLeft;
            y += parent.offsetTop;
            parent = parent.offsetParent;
        }
        
        if (w == 0) {
            w += parseInt(node.currentStyle.width);
            w += parseInt(node.currentStyle.paddingRight);
            w += parseInt(node.currentStyle.paddingLeft);
            w += parseInt(node.currentStyle.borderWidth) * 2;
        }
        
        if (h == 0) {
            h += parseInt(node.currentStyle.height);
            h += parseInt(node.currentStyle.paddingTop);
            h += parseInt(node.currentStyle.paddingBottom);
            h += parseInt(node.currentStyle.borderWidth) * 2;
        }
        
        return {x: x, y: y, w: w, h: h};
    }    
}

function OrgChart(){
    this.Options = null;
    this.StyleSheet = null;
  
    this.LineSize = 0;
    this.LineColor = "";

    this.IntervalWidth = 0;
    this.IntervalHeight = 0;
    this.Top = 0;
    this.Left = 0;
    this.AutoPos = true;
    this.Depth = 0;
    
    this.RootNodes = "";
    this.Nodes = [];
    this.DepthGroup = []; 
    
    this.EdgeWidth = null;
    this.EdgeHeight = null;
    this.EdgeTemplet = null;
    this.ShowType = null;

    this.NodeOnClick = "";
    this.NodeOnMouseMove = "";
    this.NodeOnMouseOver = "";
    this.NodeOnMouseOut = "";
    this.DepthOnProcess = "";
  
    this.CssText = "";
  
    this.DivWidth = 0;
    this.DivHeight = 0;
  
    var This = this;  
    var OrgNode_ = "";
    
    this.Render = function() {
        OrgNode_ = this.RootNodes; 

        if (OrgNode_ == null || OrgNode_ == "" || OrgNode_ == undefined) {
            return;
        }
      
        if (this.Options == null || this.Options == "" || this.Options == undefined) {
            this.Options = new OrgOptions();  
        }
      
        this.LineSize = this.Options.LineSize;
        this.LineColor = this.Options.LineColor;

        this.IntervalWidth = this.Options.IntervalWidth;
        this.IntervalHeight = this.Options.IntervalHeight;
        this.Top = this.Options.Top;
        this.Left = this.Options.Left;
        this.AutoPos = this.Options.AutoPos;
        this.Depth = this.Options.Depth;
    
        this.EdgeWidth = this.Options.EdgeWidth;
        this.EdgeHeight = this.Options.EdgeHeight;
        this.EdgeTemplet = this.Options.EdgeTemplet;
        this.ShowType = this.Options.ShowType;   
        
        if (this.StyleSheet == null || this.StyleSheet == "" || this.StyleSheet == undefined) {
            this.StyleSheet = new OrgStyleSheet();  
        }               

        this.CssText = this.StyleSheet.CssText;        
        
        EdgeInit(OrgNode_);
        GetNodesDepth(OrgNode_);
        SetDepthsHeight();
        HtmlCreateCssToDIV(this.CssText);
    
        var RootContainer = this.Nodes[0].Container;
        var parentOffset = {"top":0, "left":0};
        var parentNodes = find_parentNodes(RootContainer);
        
        var ParentDiv = document.getElementById(RootContainer);

        event_addevent(RootContainer, this.NodeOnClick, "onclick");
        event_addevent(RootContainer, this.NodeOnMouseMove, "onmousemove");
        event_addevent(RootContainer, this.NodeOnMouseOver, "onmouseover");
        event_addevent(RootContainer, this.NodeOnMouseOut, "onmouseout");

        for (key in parentNodes) {    
            var HwndElement = parentNodes[key];
            parentOffset["top"] += getElementPosTop(HwndElement);
            parentOffset["left"] += getElementPosLeft(HwndElement);
        }

        if (this.AutoPos == true || this.AutoPos == 1) {
            if (parentOffset["top"] >= 0) {
                this.Top += parentOffset["top"];
            }
            if (parentOffset["left"] >= 0) {
                this.Left += parentOffset["left"];
            }
        }

        for (var n=1; n<=this.Depth; n++) {
            var tempTop = this.Top + GetDepthHeightToRoot(n);
            var tempNodes = this.DepthGroup[n].Nodes;
          
            for (var m=0; m<tempNodes.length; m++){
                tempNodes[m].Top = tempTop;
            }
        }

        for (var n=this.Depth; n>=1; n--) {
            var DepthNodes = this.DepthGroup[n].Nodes;
            
            if (typeof this.DepthOnProcess === "function") {
                 this.DepthOnProcess(DepthNodes, n);
            }
          
            if (n == this.Depth) {
                for(var m=0; m<DepthNodes.length; m++){
                    if(m == 0){
                        DepthNodes[m].Left = 0;
                    }
                    else{
                        DepthNodes[m].Left = DepthNodes[m-1].Left + DepthNodes[m-1].Width + this.IntervalWidth;
                    }
                }
            }
            else {
                for (var m=0; m<DepthNodes.length; m++) {
                    if (DepthNodes[m].Nodes.length != 0) {
                        var tempNodeLeft_ = DepthNodes[m].Nodes[0].Left + (GetGroupWidthByNode(DepthNodes[m].Nodes[0]) / 2);
                        tempNodeLeft_ -= (DepthNodes[m].Width / 2);
                        DepthNodes[m].Left = tempNodeLeft_;
                    }
                }
                
                for (var m=0; m<DepthNodes.length; m++) {
                    if (DepthNodes[m].Left == null){
                        SetLeftByDepthNode(DepthNodes, m, "LTR");
                    }
                }
            
                for (var m=1; m<DepthNodes.length; m++) {
                    var ErrDistance = this.IntervalWidth - (DepthNodes[m].Left - DepthNodes[m-1].Left - DepthNodes[m-1].Width);
                    if (ErrDistance > 0) {
                        for (var u_=m; u_<DepthNodes.length; u_++) {
                            AmendNodeLeft(DepthNodes[u_], ErrDistance);
                        }
                    }
                }
            }
        }        
        SetDepthGroupWidth();
        
        var MaxLeftValue = this.Nodes[0].Left;
        for (var n=1; n<this.Nodes.length; n++){
            if (MaxLeftValue > this.Nodes[n].Left) {
                MaxLeftValue = this.Nodes[n].Left;
            }
        }
        
        MaxLeftValue = (-MaxLeftValue) + this.Left;
        for (var n=0; n<this.Nodes.length; n++) {
            this.Nodes[n].Left += MaxLeftValue;
            this.Nodes[n].Edge.style.left = this.Nodes[n].Left + "px";
            this.Nodes[n].Edge.style.top = this.Nodes[n].Top + "px";
            
            if (this.Nodes[n].Left >= this.DivWidth) {
                this.DivWidth = this.Nodes[n].Left;              
            }
            
            if (this.Nodes[n].Top >= this.DivHeight) {
                this.DivHeight = this.Nodes[n].Top;              
            }
        }
        
        this.DivWidth += this.IntervalWidth + this.Left;
        this.DivHeight += this.IntervalHeight;

        for (var n=1; n<=this.Depth; n++) {
            var tempNodes = this.DepthGroup[n].Nodes;
            for(var m=0; m<tempNodes.length; m++){
                if (n != this.Depth) {
                    if (tempNodes[m].Nodes.length != 0) {
                        var tempLineLeft = tempNodes[m].Left + (tempNodes[m].Width / 2);
                        var tempLineHeight = ((this.IntervalHeight - this.LineSize) / 2);
                        
                        /*if (tempNodes[m].Nodes.length % 2 == 0) {
                            tempLineHeight = (tempLineHeight / 2);
                        }   
                        else if (tempNodes[m].Nodes.length == 1) {
                            tempLineHeight = (tempLineHeight - (this.IntervalHeight / 2));    
                        }*/
                        tempLineHeight += (this.DepthGroup[n].Height - tempNodes[m].Height);

                        var tempLineTop = tempNodes[m].Top + tempNodes[m].Height;
                        var tempBottomLine = new HtmlDrawLine(ParentDiv, 2, tempLineTop, tempLineLeft, tempLineHeight, this.LineSize, this.LineColor, "LineBottom_" + tempNodes[m].Id);
                        
                        tempNodes[m].BottomLine = tempBottomLine.Line;
                    }
                }
                
                if (n != 1){
                    var tempLineLeft = tempNodes[m].Left + (tempNodes[m].Width / 2);
                    var tempLineHeight = ((this.IntervalHeight - this.LineSize) / 2);
                    var tempLineTop = tempNodes[m].Top - tempLineHeight;
                    if (this.DepthGroup[tempNodes[m].Depth].NodeGroups[tempNodes[m].NodeGroupId].length == 1) {
                        var tempBottomLineHeight = parseFloat(tempNodes[m].parentNode.BottomLine.style.height) + this.LineSize;
                        tempNodes[m].parentNode.BottomLine.style.height = (tempLineHeight + tempBottomLineHeight) + "px";
                    }
                    else {
                        var temptopLine = new HtmlDrawLine(ParentDiv, 2, tempLineTop, tempLineLeft, tempLineHeight, this.LineSize, this.LineColor, "LineTop_" + tempNodes[m].Id);
                        tempNodes[m].TopLine = temptopLine.Line;
                    }
                }
            }
        }
      
        for (var n=2; n<=this.Depth; n++) {
            var tempNodeGroups_ = this.DepthGroup[n].NodeGroups;
            for (var m=0; m<tempNodeGroups_.length; m++) {
                if (tempNodeGroups_[m].length != 1) {
                    var tempLineWidth = tempNodeGroups_[m].Width - (tempNodeGroups_[m][0].Width / 2) + this.LineSize;
                    tempLineWidth -= (tempNodeGroups_[m][tempNodeGroups_[m].length-1].Width / 2);
                    var tempLineTop = tempNodeGroups_[m][0].Top - ((this.IntervalHeight - this.LineSize) / 2) - this.LineSize;
                    var tempLineLeft = tempNodeGroups_[m][0].Left + (tempNodeGroups_[m][0].Width / 2);
                    var tempGroupLine = new HtmlDrawLine(ParentDiv, 1, tempLineTop, tempLineLeft, tempLineWidth, this.LineSize, this.LineColor, "LineGroup_" + tempNodeGroups_[m][0].Id);
                }
            }
        }

        function AmendNodeLeft(Node_, ErrDistance_) {
            Node_.Left = Node_.Left + ErrDistance_;
            if (Node_.Nodes.length != 0) {
                for (var n=0; n<Node_.Nodes.length; n++) {
                    AmendNodeLeft(Node_.Nodes[n], ErrDistance_);
                }
            }
        }
    }
    
    this.GetContainerStyle = function() {
        var objStyle = {'width':this.DivWidth, 'height':this.DivHeight}; 
        
        return objStyle; 
    }

    function event_addevent(ev_node, ev_func, ev_name) {
        if (typeof ev_func === "function") {
            var cNodes = document.getElementById(ev_node).childNodes;
            
            for (var i=0; i<cNodes.length; i++) {
                switch (ev_name) {
                    case 'onmousemove': cNodes[i].onmousemove = ev_func;
                    break;
                    case 'onmouseover': cNodes[i].onmouseover = ev_func;
                    break;
                    case 'onmouseout': cNodes[i].onmouseout = ev_func;
                    break;
                    case 'onclick': cNodes[i].onclick = ev_func;
                    break;
                }                
            }
        }
    }

    function find_parentNodes(id) {
        var el = document.getElementById(id);
        var nodes = [];
        var i = 0;

        if (el != null || el != "" || el != undefined) {         
            while (el && el.nodeName) {
                el = el.parentNode;            
                if (el.nodeName != "HTML") {
                    nodes[i] = el;
                    i += 1;
                }
                else {
                    break;
                }
            }
        }

        return nodes;
    }
    
    // ---------------------------------------------------------------
    // Author: yifeng.ruan@gmail.com
    // Url: http://www.ruanyifeng.com/blog/2009/09/find_element_s_position_using_javascript.html
    // ---------------------------------------------------------------
    function getElementPosLeft(element) {
        var actualLeft = element.offsetLeft;
        var current = element.offsetParent;

        while (current !== null) {
            actualLeft += current.offsetLeft;
            current = current.offsetParent;
        }

        return actualLeft;
    }

    // ---------------------------------------------------------------
    // Author: yifeng.ruan@gmail.com
    // Url: http://www.ruanyifeng.com/blog/2009/09/find_element_s_position_using_javascript.html
    // ---------------------------------------------------------------
    function getElementPosTop(element) {
        var actualTop = element.offsetTop;
        var current = element.offsetParent;

        while (current !== null){
            actualTop += current.offsetTop;
            current = current.offsetParent;
        }

        return actualTop;
    }
    
    function GetGroupWidthByNode(Node_) {
        var tempNodesGroup_ = This.DepthGroup[Node_.Depth].NodeGroups[Node_.NodeGroupId];
        var tempGroupWidth_ = tempNodesGroup_[tempNodesGroup_.length-1].Left - tempNodesGroup_[0].Left;      
        tempGroupWidth_ += tempNodesGroup_[tempNodesGroup_.length-1].Width
      
        return tempGroupWidth_;
    }

    function SetLeftByDepthNode(DepthNodes_, NodeId, Type) {
        if (Type == "LTR" && NodeId == DepthNodes_.length-1) {
            SetLeftByDepthNode(DepthNodes_, NodeId, "RTL");          
            return;
        }
        
        if (Type == "RTL" && NodeId == 0){
            SetLeftByDepthNode(DepthNodes_, NodeId, "LTR");          
            return;
        }
        
        var FindIndex = null;
        if (Type == "LTR") {
            for (var r_=NodeId+1; r_<DepthNodes_.length; r_++){
                if (DepthNodes_[r_].Left != null) {
                    FindIndex = r_;                  
                    break;
                }
            }
            
            if (FindIndex == null){
                SetLeftByDepthNode(DepthNodes_, NodeId, "RTL");              
                return;
            }
            else {
                for (var r_=FindIndex-1; r_>=NodeId; r_--) {
                    DepthNodes_[r_].Left = DepthNodes_[r_+1].Left - This.IntervalWidth - DepthNodes_[r_].Width;
                }
            }
        }
        
        if (Type == "RTL") {
            for (var r_=NodeId-1; r_>=0; r_--) {
                if (DepthNodes_[r_].Left != null){
                    FindIndex = r_;
                    break;
                }
            }
            
            if (FindIndex == null){
                SetLeftByDepthNode(DepthNodes_, NodeId, "LTR");
              
                return;
            }
            else {
                for (var r_=FindIndex+1; r_<=NodeId; r_++) {
                    DepthNodes_[r_].Left = DepthNodes_[r_-1].Left + This.IntervalWidth + DepthNodes_[r_-1].Width;
                }
            }
        }
    }

    function GetDepthHeightToRoot(DepthId){
        var tempHeight_ = 0;
      
        for(var x_=DepthId; x_>=1; x_--){
            tempHeight_ += This.DepthGroup[x_].Height;
        }
        
        tempHeight_ += This.IntervalHeight * (DepthId - 1);
        tempHeight_ -= This.DepthGroup[DepthId].Height;
        
        return tempHeight_;
    }

    function SetLeftPosByChildNode(Node_, ChildNode_) {
        var tempNodeGroups = This.DepthGroup[ChildNode_.Depth].NodeGroups[ChildNode_.NodeGroupId];
        var tempNodeLeft;
        if (tempNodeGroups.length == 1){
            tempNodeLeft = ((ChildNode_.Width / 2) + ChildNode_.Left) - (Node_.Width / 2);
        }
        else {
            tempNodeLeft=GetFirstLeftPos(ChildNode_) + (tempNodeGroups.Width / 2) - (Node_.Width / 2);
        }
        
        Node_.Left = tempNodeLeft;
    }
  
    function GetFirstLeftPos(Node_) {
        if (Node_.NodeOrderId == 0) {
            return Node_.Left;
        }
        
        var tempWidth = 0;
        for (var k_=0; k_<=Node_.NodeOrderId; k_++) {
            var tempGroupsNode=This.DepthGroup[Node_.Depth].NodeGroups[Node_.NodeGroupId][k_];
            tempWidth+=tempGroupsNode.Width;
        }
        
        tempWidth+=(Node_.NodeOrderId * This.IntervalWidth);
        
        return ((Node_.Left - tempWidth) + (Node_.Width / 2));
    }


    function ChildNodesWidth(OrgObj) {
        var ReWidth = 0;
        for (var s_ = 0; s_<OrgObj.Nodes.length; s_++){
            ReWidth += OrgObj.Nodes[s_].Width;
        }
        
        ReWidth += (OrgObj.Nodes.length-1) * This.IntervalWidth;
        
        return ReWidth;
    }

    function SetDepthGroupWidth() {
        for (var n_=1; n_<=This.Depth; n_++) {
            var tempNodeGroups = This.DepthGroup[n_].NodeGroups;
            for (var m_=0; m_<tempNodeGroups.length; m_++) {
                tempNodeGroups[m_].Width = GetGroupWidthByNode(tempNodeGroups[m_][0]);
            }
        }
    }

    function SetDepthsHeight() {
        for (var n_=1; n_<=This.Depth; n_++) {
            var tempNodes_ = This.DepthGroup[n_].Nodes;
            var MaxHeight = 0;
          
            for (var m_=0; m_<tempNodes_.length; m_++){
                if (tempNodes_[m_].Height > MaxHeight) {
                    MaxHeight = tempNodes_[m_].Height;
                }
            }
            This.DepthGroup[n_].Height = MaxHeight;
        }
    }

    function GetNodesDepth(OrgObj) {
        This.Nodes[This.Nodes.length] = OrgObj;
        OrgObj.Depth = (This.Depth == 0) ? This.Depth + 1 : OrgObj.parentNode.Depth+1;
      
        This.Depth = (OrgObj.Depth > This.Depth) ? OrgObj.Depth : This.Depth;      
        if (typeof(This.DepthGroup[OrgObj.Depth]) != "object") {
            This.DepthGroup[OrgObj.Depth] = [];
            This.DepthGroup[OrgObj.Depth].Nodes = [];
            This.DepthGroup[OrgObj.Depth].NodeGroups = [];
        }
        
        This.DepthGroup[OrgObj.Depth].Nodes[This.DepthGroup[OrgObj.Depth].Nodes.length] = OrgObj;
        if (OrgObj.Depth == 1){
            This.DepthGroup[OrgObj.Depth].NodeGroups[0] = [];
            This.DepthGroup[OrgObj.Depth].NodeGroups[0][0] = OrgObj;
            OrgObj.NodeGroupId = 0;
            OrgObj.NodeOrderId = 0;
        }
        else{
            if (This.DepthGroup[OrgObj.Depth].NodeGroups.length == 0) {
                This.DepthGroup[OrgObj.Depth].NodeGroups[0] = [];
                This.DepthGroup[OrgObj.Depth].NodeGroups[0][0] = OrgObj;
                OrgObj.NodeGroupId = 0;
                OrgObj.NodeOrderId = 0;
            }
            else {
                var GroupsLength = This.DepthGroup[OrgObj.Depth].NodeGroups.length;
                var GroupNodesLength = This.DepthGroup[OrgObj.Depth].NodeGroups[GroupsLength-1].length;
              
                if (OrgObj.parentNode == This.DepthGroup[OrgObj.Depth].NodeGroups[GroupsLength-1][GroupNodesLength-1].parentNode) {
                    This.DepthGroup[OrgObj.Depth].NodeGroups[GroupsLength-1][GroupNodesLength] = OrgObj;
                    OrgObj.NodeGroupId = GroupsLength - 1;
                    OrgObj.NodeOrderId = GroupNodesLength;
                }
                else {
                    if (typeof(This.DepthGroup[OrgObj.Depth].NodeGroups[GroupsLength]) != "object"){
                        This.DepthGroup[OrgObj.Depth].NodeGroups[GroupsLength]=[];
                    }
                    
                    GroupNodesLength = This.DepthGroup[OrgObj.Depth].NodeGroups[GroupsLength].length;
                    This.DepthGroup[OrgObj.Depth].NodeGroups[GroupsLength][GroupNodesLength] = OrgObj;
                    OrgObj.NodeGroupId = GroupsLength;
                    OrgObj.NodeOrderId = GroupNodesLength;
                }
            }
        }
      
        if (OrgObj.Nodes.length != 0) {
            for(var n=0; n<OrgObj.Nodes.length; n++) {
                GetNodesDepth(OrgObj.Nodes[n]);
            }
        }
    }
    
    function EdgeInit(OrgObj_) {
        OrgObj_.Templet = GetEdgeTemplet();
        OrgObj_.EdgeWidth = This.EdgeWidth;
        OrgObj_.EdgeHeight = This.EdgeHeight;
        OrgObj_.inIt();
  
        if (OrgObj_.Nodes.length != 0) {
            for (var n=0; n<OrgObj_.Nodes.length; n++) {
                EdgeInit(OrgObj_.Nodes[n]);
            }
        }
    }

    function GetEdgeTemplet() {
        if (This.EdgeTemplet != null) {
            return This.EdgeTemplet;
        }
        
        var TempletStr = "<div id=\"{Id}\" class=\"OrgNode\" title=\{InfoTip}\" uid=\"{UidName}\" style=\"font-size:12px;padding:5px 5px 5px 5px;border:thin solid #b0e0e6;background-color:#e0ffff; clear:left;float:left;text-align:center;position:absolute;"
        if (This.ShowType == 2) {
            TempletStr += "writing-mode: tb-rl;";
        }
        
        TempletStr += "\"><span>{Caption}</span><div><font color=\"{Color}\">{Description}</font></div></div>";
          
        return TempletStr;
    }
    
    function HtmlCreateCssToDIV(style_) {
        if (style_ == null || style_ == "" || style_ == undefined) {
            return;
        }
        
        var tCss = document.createElement("style");
        tCss.type = "text/css";
        
        var tStyles = style_;
        if (tCss.styleSheet) {
            tCss.styleSheet.cssText = tStyles;
        }
        else {
            tCss.appendChild(document.createTextNode(tStyles));
        }
        
        document.getElementsByTagname("head")[0].appendChild(tCss);
    }
  
    function HtmlDrawLine(parentDiv, type_, top_, left_, long_, size_, color_, id_) {
        this.Type = type_;
      
        top_ = top_ + "";
        left_ = left_ + "";
        long_ = long_ + "";
      
        this.Top = (top_.substr(top_.length - 2).toLowerCase() != "px") ? top_ + "px" : top_;
        this.Left = (left_.substr(left_.length - 2).toLowerCase() !="px") ? left_ + "px" : left_;
        this.Long = (long_.substr(long_.length - 2).toLowerCase() != "px") ? long_ + "px" : long_;
        this.Size = (size_ == undefined) ? "1px" : size_ + "";
        this.Id = (id_ == undefined) ? null : id_;
        this.Size = (this.Size.substr(this.Size.length - 2).toLowerCase() != "px") ? this.Size + "px" : this.Size;
        this.Color = (color_ == undefined) ? "#000000" : color_;
        this.Line = document.createElement("DIV");
      
        parentDiv = (typeof parentDiv === "object") ? parentDiv : document.body;      
        parentDiv.appendChild(this.Line);
      
        this.Line.innerText = "x";
        this.Line.style.position = "absolute";
        this.Line.style.top = this.Top;
        this.Line.style.left = this.Left;
        this.Line.style.overflow = "hidden";
        
        if (this.Type == 1) {
            this.Line.style.borderTopColor = this.Color;
            this.Line.style.borderTopWidth = this.Size;
            this.Line.style.borderTopStyle = "solid";
            this.Line.style.width = this.Long;
            this.Line.style.height = "0px";
        }
        else {
            this.Line.style.borderLeftColor = this.Color;
            this.Line.style.borderLeftWidth = this.Size;
            this.Line.style.borderLeftStyle = "solid";
            this.Line.style.height = this.Long;
            this.Line.style.width = "0px";
        }
        
        if (this.Id != null) {
            this.Line.id = this.Id;
        }
    } 
}
