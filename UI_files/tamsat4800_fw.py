import sys
from PyQt4 import QtCore, QtGui, uic
from PyQt4.QtGui import QMessageBox
import os
import serial.tools.list_ports


qtCreatorFile = "main.ui" 
Ui_MainWindow, QtBaseClass = uic.loadUiType(qtCreatorFile)

qtAboutDialogFile = "about.ui"
Ui_AboutDialog, QtBaseClass = uic.loadUiType(qtAboutDialogFile)

class TAMSATPrgApp(QtGui.QMainWindow, Ui_MainWindow):
    def __init__(self):
        super(TAMSATPrgApp, self).__init__()
        self.ui = Ui_MainWindow()
        self.ui.setupUi(self)
        self.FillPorts()
        self.ui.btn_file.clicked.connect(self.SelectHexFile)
        self.ui.btn_write.clicked.connect(self.WriteHex)
        self.ui.actionProgram_Hakkinda.triggered.connect(self.ShowAbout)
        
    def SelectHexFile(self):
        dir = os.getcwd()
        filters = "Hex Dosyalar (*.hex);;Bin dosyalar (*.bin)"
        self.ui.editHexFilename.setText(QtGui.QFileDialog.getOpenFileName(self, " Dosya Secimi ", dir, filters ))
        if os.path.isfile(self.ui.editHexFilename.text()) :
            self.ui.statusEdit.setText("HEX dosyasi secildi")
            
    def FillPorts(self):
        port_list = list(serial.tools.list_ports.comports())
        self.ui.combo_port.clear()
        if len(port_list) >= 1:
            for port in port_list:
                self.ui.combo_port.addItem(port[0])
            self.ui.btn_write.setEnabled(True)
            self.ui.statusEdit.setText("Portl listesi alindi...")
        else:
            msg = QtGui.QMessageBox()
            msg.setIcon(QMessageBox.Warning)
            msg.setText("Bilgisayarda uygun COM portu bulunamadi")
            msg.setWindowTitle("HATA!!!")
            retval = msg.exec_()
    def WriteHex(self):
            print "geldiM"
    def ShowAbout(self):
            abtDialog = TAMSATAboutDlg()
            uiabtDialog = Ui_AboutDialog()
            uiabtDialog.setupUi(abtDialog)
            abtDialog.exec_()
            
            

class TAMSATAboutDlg(QtGui.QDialog, Ui_AboutDialog):
    def __init__(self):
        #super(TAMSATAboutDlg, self).__init__()
        QtGui.QDialog.__init__((self))
        self.setupUi(self)
        #self.aui = Ui_AboutDialog

if __name__ == "__main__":
    app = QtGui.QApplication(sys.argv)
    window = TAMSATPrgApp()
    window.show()
    sys.exit(app.exec_())


