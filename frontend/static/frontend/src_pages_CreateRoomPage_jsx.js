/*! For license information please see src_pages_CreateRoomPage_jsx.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_pages_CreateRoomPage_jsx"],{"./src/pages/CreateRoomPage.jsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CreateRoomPage: () => (/* binding */ CreateRoomPage)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Grid2/Grid2.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Button/Button.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Collapse/Collapse.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Alert/Alert.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Typography/Typography.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/FormControl/FormControl.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/FormHelperText/FormHelperText.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/RadioGroup/RadioGroup.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/FormControlLabel/FormControlLabel.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Radio/Radio.js");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/TextField/TextField.js");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");\n\n\n\nconst defaultProps = {\n  votesToSkip: 2,\n  guestCanPause: true,\n  update: false,\n  errorMsg: "",\n  successMsg: "",\n  roomCode: null,\n  updateCallBack: () => {}\n};\nconst CreateRoomPage = () => {\n  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_1__.useNavigate)();\n  const [guestCanPause, setGuestCanPause] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultProps.guestCanPause);\n  const [votesToSkip, setVotesToSkip] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultProps.votesToSkip);\n  const [errorMsg, setErrorMsg] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");\n  const [successMsg, setSuccessMsg] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");\n  const [roomCode, setRoomCode] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n  const handleVotesChange = e => {\n    setVotesToSkip(e.target.value);\n  };\n  const handleGuestCanPauseChange = e => {\n    setGuestCanPause(e.target.value === "true" ? true : false);\n  };\n  const handleRoomButtonPressed = () => {\n    const requestOptions = {\n      method: "POST",\n      headers: {\n        "Content-Type": "application/json"\n      },\n      body: JSON.stringify({\n        votes_to_skip: votesToSkip,\n        guest_can_pause: guestCanPause\n      })\n    };\n    fetch("/v1/create-room", requestOptions).then(response => response.json()).then(data => {\n      if (data.code != null) {\n        setRoomCode(data.code);\n        navigate(`/room/${roomCode}`);\n      }\n    });\n  };\n  const handleUpdateButtonPressed = () => {\n    const requestOptions = {\n      method: "PATCH",\n      headers: {\n        "Content-Type": "application/json"\n      },\n      body: JSON.stringify({\n        votes_to_skip: votesToSkip,\n        guest_can_pause: guestCanPause,\n        code: defaultProps.roomCode\n      })\n    };\n    fetch("/v1/update-room", requestOptions).then(response => {\n      if (response.ok) {\n        setSuccessMsg("Room Updated successfully!");\n      } else {\n        setErrorMsg("Erros updating Room...");\n      }\n      defaultProps.updateCallBack();\n    });\n  };\n  const renderCreateButton = () => {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__["default"], {\n      item: true,\n      size: {\n        xs: 12\n      },\n      align: "center"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_3__["default"], {\n      color: "primary",\n      variant: "contained",\n      onClick: handleRoomButtonPressed\n    }, "Create Room")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__["default"], {\n      item: true,\n      size: {\n        xs: 12\n      },\n      align: "center"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_3__["default"], {\n      color: "secondary",\n      variant: "contained",\n      to: "/",\n      component: react_router_dom__WEBPACK_IMPORTED_MODULE_4__.Link\n    }, "Back")));\n  };\n  const renderUpdateButton = () => {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__["default"], {\n      item: true,\n      size: {\n        xs: 12\n      },\n      align: "center"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_3__["default"], {\n      color: "primary",\n      variant: "contained",\n      onClick: handleUpdateButtonPressed\n    }, "Update Room"));\n  };\n  const title = defaultProps.update ? "Update Room" : "Create a Room";\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__["default"], {\n    container: true,\n    spacing: 1,\n    className: "center"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__["default"], {\n    item: true,\n    size: {\n      xs: 12\n    },\n    align: "center"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], {\n    in: errorMsg != "" || successMsg != ""\n  }, successMsg != "" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {\n    severity: "success",\n    onClose: () => setSuccessMsg("")\n  }, successMsg) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {\n    severity: "error",\n    onClose: () => setErrorMsg("")\n  }, errorMsg))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__["default"], {\n    item: true,\n    size: {\n      xs: 12\n    },\n    align: "center"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {\n    component: "h4",\n    variant: "h4"\n  }, title)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__["default"], {\n    item: true,\n    size: {\n      xs: 12\n    },\n    align: "center"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {\n    component: "fieldset"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n    align: "center"\n  }, "Guest Control of Playback State")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_10__["default"], {\n    row: true,\n    defaultValue: defaultProps.guestCanPause.toString(),\n    onChange: handleGuestCanPauseChange\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_11__["default"], {\n    value: "true",\n    control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_12__["default"], {\n      color: "primary"\n    }),\n    label: "Play/Pause",\n    labelPlacement: "bottom"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_11__["default"], {\n    value: "false",\n    control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_12__["default"], {\n      color: "secondary"\n    }),\n    label: "No Control",\n    labelPlacement: "bottom"\n  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__["default"], {\n    item: true,\n    size: {\n      xs: 12\n    },\n    align: "center"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_13__["default"], {\n    required: true,\n    type: "number",\n    onChange: handleVotesChange,\n    defaultValue: votesToSkip,\n    slotProps: {\n      htmlInput: {\n        min: 1,\n        max: 6,\n        style: {\n          textAlign: "center"\n        }\n      }\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n    aling: "center"\n  }, "Votes Required To Skip Song")))), defaultProps.update ? renderUpdateButton() : renderCreateButton()));\n};\n\n//# sourceURL=webpack://frontend/./src/pages/CreateRoomPage.jsx?')}}]);