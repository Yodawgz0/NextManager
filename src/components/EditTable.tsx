import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Modal, Row, Typography } from "antd";
import { Dispatch, SetStateAction } from "react";
import { DataType } from "@/pages/Dashboard";
import { FormOutlined, NumberOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";

interface modalprops {
  openModal: boolean;
  setopenModal: Dispatch<SetStateAction<boolean>>;
  dataPlayerEdit: DataType;
  setAlertText: Dispatch<SetStateAction<string>>;
  getPlayerData: Function;
}

const EditTable = ({
  openModal,
  setopenModal,
  dataPlayerEdit,
  setAlertText,
  getPlayerData,
}: modalprops) => {
  const [showError, setShowError] = useState<boolean>(false);

  const handleSavePlayerData = () => {
    if (Object.values(playerDataEditedValues).every((v) => v || v === 0)) {
      if (
        Object.keys(dataPlayerEdit).filter(
          //@ts-ignore
          (e: string) => playerDataEditedValues[e] !== dataPlayerEdit[e]
        ).length
      ) {
        let userDetails = {};
        Object.keys(dataPlayerEdit)
          .filter(
            //@ts-ignore
            (e: string) => playerDataEditedValues[e] !== dataPlayerEdit[e]
          )
          .forEach((element) => {
            userDetails = {
              ...userDetails,
              //@ts-ignore
              [element]: playerDataEditedValues[element],
            };
          });
        axios
          .patch(`http://localhost:8000/editPlayer/${dataPlayerEdit._id}`, {
            userDetails,
          })
          .then(function (response) {
            setAlertText(response.data.message);
            getPlayerData();
          })
          .catch(function (err) {
            console.log(err);
            setAlertText("Something Went Wrong");
          });
      }

      setopenModal(false);
    } else {
      setShowError(true);
    }
  };
  const [playerDataEditedValues, setPlayerDataEditedValues] =
    useState<DataType>(dataPlayerEdit);

  useEffect(() => {
    setShowError(false);
  }, [playerDataEditedValues]);

  const handleCancel = () => {
    setShowError(false);
    setopenModal(false);
  };

  return (
    <>
      <Modal
        title={`Edit player: ${dataPlayerEdit.PLAYER_NAME}`}
        open={openModal}
        footer={null}
        closable={false}
      >
        <Form
          name="nest-messages"
          style={{ maxWidth: 400 }}
          className="bg-slate-100 p-6 w-screen border-solid border-2 rounded-2xl flex-col border-red-500 ms-9"
        >
          <Row>
            <Col span={22} className="mb-4">
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                value={playerDataEditedValues.PLAYER_NAME}
                placeholder="Player Name"
                onChange={(e) =>
                  setPlayerDataEditedValues({
                    ...playerDataEditedValues,
                    PLAYER_NAME: e.target.value,
                  })
                }
              />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col span={12}>
              <Input
                type="number"
                className="w-36"
                prefix={<NumberOutlined className="site-form-item-icon" />}
                placeholder="Game ID"
                value={playerDataEditedValues.GAME_ID}
                onChange={(e) =>
                  setPlayerDataEditedValues({
                    ...playerDataEditedValues,
                    GAME_ID: parseInt(e.target.value),
                  })
                }
              />
            </Col>
            <Col span={12}>
              <Input
                type="number"
                className="w-36"
                prefix={<NumberOutlined className="site-form-item-icon w" />}
                placeholder="Shot Number"
                value={playerDataEditedValues.SHOT_NUMBER}
                required
                onChange={(e) =>
                  setPlayerDataEditedValues({
                    ...playerDataEditedValues,
                    SHOT_NUMBER: parseInt(e.target.value),
                  })
                }
              />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col span={12}>
              <Input
                type="number"
                className="w-36"
                prefix={<NumberOutlined className="site-form-item-icon" />}
                placeholder="Period"
                value={playerDataEditedValues.PERIOD}
                onChange={(e) =>
                  setPlayerDataEditedValues({
                    ...playerDataEditedValues,
                    PERIOD: parseInt(e.target.value),
                  })
                }
              />
            </Col>
            <Col span={12}>
              <Input
                className="w-36"
                prefix={<FormOutlined className="site-form-item-icon" />}
                placeholder="Shot Result"
                value={playerDataEditedValues.SHOT_RESULT}
                onChange={(e) =>
                  setPlayerDataEditedValues({
                    ...playerDataEditedValues,
                    SHOT_RESULT: e.target.value,
                  })
                }
              />
            </Col>
          </Row>
          <Row>
            <Col span={22} className="mb-4">
              <Input
                prefix={<FormOutlined className="site-form-item-icon" />}
                placeholder="Closest Defender"
                value={playerDataEditedValues.CLOSEST_DEFENDER}
                onChange={(e) =>
                  setPlayerDataEditedValues({
                    ...playerDataEditedValues,
                    CLOSEST_DEFENDER: e.target.value,
                  })
                }
              />
            </Col>
          </Row>
        </Form>
        <br />
        {showError ? (
          <Typography className="text-center text-red-600 mb-3">
            Please Enter All Valid Values!
          </Typography>
        ) : (
          <></>
        )}
        <div className="px-5">
          <Button
            type="primary"
            onClick={() => handleSavePlayerData()}
            block
            className="bg-amber-950 block"
          >
            Save Player Data
          </Button>
          <Button className="mt-4" block danger onClick={() => handleCancel()}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default EditTable;
